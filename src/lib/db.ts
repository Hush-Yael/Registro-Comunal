import SQL from "@tauri-apps/plugin-sql";
import {
  BaseDirectory,
  copyFile,
  readDir,
  remove,
} from "@tauri-apps/plugin-fs";
let db = await SQL.load(`sqlite:db.db`);
import { resolveResource, appDataDir } from "@tauri-apps/api/path";
import { ComunalRecord, HabitanteData, RecordKey } from "../types/form";
import { DBComunalRecord, DBComunalRecords, DBSearch } from "../types/db";
import { EDOS_CIVIL, NIVELES_ESTUDIOS } from "../constants";
import { parseWithSex } from "./utils";

type TableName = "jefe" | "family" | "home" | "clap" | "gas" | "carnet";

type NamedTableName = { name: string; key: TableName };

const TABLES: (TableName | NamedTableName)[] = [
  { name: "vivienda", key: "home" },
  "jefe",
  "clap",
  "gas",
  "carnet",
  { name: "cargaFamiliar", key: "family" },
];

const sqlGetYears = `cast(strftime('%Y.%m%d', 'now') - strftime('%Y.%m%d', fechaNacimiento) as int) AS edad`;

const getFullName = (name: string) =>
  `JOIN jefe ON jefe.cedula = ${name}.cedula ORDER BY nombres, apellidos`;

const query = (name: string) =>
  `SELECT ${name}.*, jefe.nombres, jefe.apellidos FROM ${name} ${getFullName(
    name
  )}`;

// @returns un objeto con la estructura { [key: <nombreDeLaColumna> de acuerdo al valor]: number }
const getCountMap = async <TName extends TableName>(
  tableName: TName,
  column: keyof ComunalRecord[TName]
): Promise<{
  [K in DBComunalRecord<TName>[keyof ComunalRecord[TName]] as
    | string
    | number
    | symbol]: number;
}> => {
  const data = (await db.select(
    `SELECT ${column as string}, COUNT(*) AS total FROM ${tableName} GROUP BY ${
      column as string
    }`
  )) as ({ [K in keyof ComunalRecord[TName]]: unknown } & { total: number })[];

  return Object.fromEntries(data.map((c) => [c[column], c.total]));
};

const jefeMap = async <
  ColN extends keyof ComunalRecord["jefe"],
  M extends DBComunalRecord<"jefe">[ColN]
>(
  column: ColN,
  matches: {
    [K in M as string | number | symbol]: string;
  }
): Promise<
  {
    match: string;
    text: string;
    value: number;
  }[]
> => {
  const map = await getCountMap("jefe", column);
  return Object.entries(map).map(([key, number]) => [
    {
      match: key as M,
      text: matches[key] || key || "desconocido",
      value: number,
    },
  ]);
};

export const getRecords = async (): Promise<DBComunalRecords> => ({
  jefe: {
    records: await db.select(
      `SELECT *, ${sqlGetYears} FROM jefe ORDER BY nombres, apellidos`
    ),
    charts: {
      sexo: await jefeMap("sexo", {
        "": "Desconocido",
        M: "Masculino",
        F: "Femenino",
      }),
      nivelEstudios: await jefeMap(
        "nivelEstudios",
        Object.fromEntries(
          NIVELES_ESTUDIOS.map((n) => [n, parseWithSex("", n, "o/a")])
        )
      ),
      edoCivil: await jefeMap(
        "edoCivil",
        Object.fromEntries(
          EDOS_CIVIL.map((n) => [n, parseWithSex("", n, "o/a")])
        )
      ),
      venezolano: await jefeMap("venezolano", {
        1: "Venezolano/a",
        0: "Extranjero/a",
      }),
    },
  },
  home: await db.select(query("vivienda")),
  carnet: {
    records: await db.select(query("carnet")),
    beneficiados: (await getCountMap("carnet", "posee")) as {
      1: number;
      0: number;
      null: number;
    },
  },
  clap: {
    records: await db.select(query("clap")),
    beneficiados: (await getCountMap("clap", "posee")) as {
      1: number;
      0: number;
      null: number;
    },
  },
  gas: {
    records: await db.select(
      `SELECT gas.*, jefe.nombres, jefe.apellidos, CAST(gas."10kg" + gas."18kg" + gas."27kg" + gas."43kg" as int) AS total FROM GAS ${getFullName(
        "gas"
      )}`
    ),
    beneficiados: (await getCountMap("gas", "posee")) as {
      1: number;
      0: number;
      null: number;
    },
  },
});

export const checkCedula = async (cedula: number) => {
  const [ya] = (await db.select("SELECT cedula FROM JEFE WHERE cedula = $1", [
    cedula,
  ])) as [number];
  return ya;
};

export const getRecord = async (cedula: number): Promise<ComunalRecord> => ({
  ...Object.fromEntries(
    await Promise.all(
      TABLES.map(async (table) => {
        const name = (table as { name: string; key: string }).name || table;

        const data = (await db.select(
          `SELECT * ${
            name === "jefe" || name === "cargaFamiliar"
              ? `,${sqlGetYears}`
              : name === "gas"
              ? `, CAST("10kg" + "18kg" + "27kg" + "43kg" as int) AS total`
              : ""
          } FROM ${name} WHERE ${
            name !== "cargaFamiliar" ? "cedula" : "jefeCedula"
          } = $1`,
          [cedula]
        )) as [ComunalRecord[RecordKey]];

        return [
          (table as { name: string; key: string }).key || name,
          name !== "cargaFamiliar" ? data[0] : data,
        ];
      })
    )
  ),
});

export const getOverview = async () => {
  const values: {
    [K in RecordKey]: { [key: string]: number }[] | number;
  } = {
    jefe: await db.select("SELECT COUNT(cedula) FROM jefe"),
    home: await db.select("SELECT COUNT(cedula) FROM vivienda"),
    family: await db.select(
      "SELECT COUNT(DISTINCT(jefeCedula)) FROM cargaFamiliar"
    ),
    carnet: await db.select(
      "SELECT COUNT(cedula) FROM carnet WHERE posee == 1"
    ),
    clap: await db.select("SELECT COUNT(cedula) FROM clap WHERE posee == 1"),
    gas: await db.select("SELECT COUNT(cedula) FROM gas WHERE posee == 1"),
  };

  Object.entries(values).forEach(([key, value]) => {
    values[key as RecordKey] = Object.values(
      (value as { [key: string]: number }[])[0]
    )[0] as number;
  });

  return values as { [K in RecordKey]: number };
};

export const getHistory = (): string[] => {
  const history = localStorage.getItem("history");
  return history ? JSON.parse(history) : [];
};

const filteredQueries = (filter: RecordKey) => {
  switch (filter) {
    case "jefe": {
      return `SELECT 
          cedula, nombres, apellidos, sexo, venezolano, fechaNacimiento, edoCivil, ${sqlGetYears}
        FROM jefe
        WHERE cast(cedula as string)
          LIKE ? OR nombres LIKE ? OR apellidos LIKE ?`;
    }
    case "family": {
      return `SELECT 
          cargaFamiliar.cedula, cargaFamiliar.nombres, cargaFamiliar.apellidos, cargaFamiliar.sexo,  cargaFamiliar.parentesco, jefe.cedula AS jefeCedula, jefe.nombres AS jefeNombres, jefe.apellidos AS jefeApellidos
        FROM cargaFamiliar
        JOIN jefe ON jefe.cedula = cargaFamiliar.jefeCedula
        WHERE cast(cargaFamiliar.cedula as string) LIKE ?
          OR cast(jefe.cedula as string) LIKE ? OR cargaFamiliar.nombres LIKE ? OR cargaFamiliar.apellidos LIKE ?
      `;
    }
    case "home": {
      return `SELECT 
          vivienda.*, jefe.nombres, jefe.apellidos 
        FROM vivienda 
        JOIN jefe ON jefe.cedula = vivienda.cedula
        WHERE numCasa LIKE ? OR calle LIKE ? OR avenida LIKE ? OR referencia LIKE ? OR jefe.nombres LIKE ? OR jefe.apellidos LIKE ?
      `;
    }
    default:
      throw new Error("Invalid filter");
  }
};

export const searchRecords = async <Table extends keyof DBSearch>(
  query: string,
  filter: keyof DBSearch
): Promise<DBSearch[Table][]> => {
  if (!filter.length) return [];

  const q = filteredQueries(filter);
  return await db.select(
    q,
    // se indican tantos % como palabras en la consulta
    [`%${query}%`].concat(q.match(/OR/g)?.map(() => `%${query}%`) || [])
  );
};

export const restoreDefaultData = async () => {
  const contents = await readDir("", {
    baseDir: BaseDirectory.AppData,
  });

  const dbFile = contents.filter(
    (entry) => entry.isFile && entry.name === "db.db"
  );

  if (!dbFile)
    throw new Error("No se encontró el archivo de la base de datos.");

  const close = await db.close();
  if (!close) throw new Error("No se pudo cerrar la base de datos.");

  await remove(dbFile[0].name, { baseDir: BaseDirectory.AppData });
  const defPath = await resolveResource("default.db"),
    AppPath = await appDataDir();

  await copyFile(defPath, `${AppPath}/${dbFile[0].name}`);

  db = await SQL.load(`sqlite:db.db`);
};

export const restoreFromFile = async (path: string) => {
  let newDb = await SQL.load(`sqlite:${path}`);
  const AppPath = await appDataDir();

  await newDb.execute(`VACUUM INTO "${AppPath}/new-db.db"`);
  await newDb.close();
  await remove("db.db", { baseDir: BaseDirectory.AppData });
  await copyFile(`new-db.db`, "db.db", {
    fromPathBaseDir: BaseDirectory.AppData,
    toPathBaseDir: BaseDirectory.AppData,
  });
  await remove(`${AppPath}/new-db.db`, { baseDir: BaseDirectory.AppData });
};

export const createBackup = async (path: string) => {
  const now = `${new Date()
    .toLocaleDateString()
    .replace(/\//g, "-")} — ${new Date()
    .toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })
    .replace(":", "_")}`;

  return await db.execute(
    `VACUUM INTO "${path}\\Base de datos del Registro Comunal (${now}).db"`
  );
};

export const emptyDB = async () => await db.execute("DELETE FROM jefe");

const getSql = <TName extends TableName, M extends "insert" | "update">(
  tableName: TName,
  values: ComunalRecord[RecordKey] | HabitanteData,
  jefeOrOriCedula: number,
  mode: M
) => {
  const sql: { query: string; values: string; array: unknown[] } = {
    query: `${mode === "update" ? "UPDATE" : "INSERT INTO"} ${tableName} ${
      mode === "update" ? "SET " : "("
    }`,
    values: mode === "update" ? "" : " values (",
    array: [],
  };

  const entries = Object.entries(
    // si la tabla es Jefe o se esta actualizando, no se necesita indicar la cédula del jefe
    tableName === "jefe" || mode === "update"
      ? // la tabla Jefe: no se necesita indicar la cédula del jefe (porque ya debe estar en los values)
        values
      : {
          ...values,
          // se le pasa la cédula del jefe para hacer la relación
          [(tableName as RecordKey) ===
          ("cargaFamiliar" as unknown as RecordKey)
            ? "jefeCedula"
            : "cedula"]: jefeOrOriCedula,
        }
  );

  entries.forEach(([name, value], i) => {
    const colName = name.match(/^\d/) ? `"${name}"` : name;
    sql.query += `${colName} `;

    if (mode === "insert") {
      sql.query += `${i + 1 < entries.length ? ", " : ")"}`;
      sql.values += `$${i + 1}${i + 1 < entries.length ? ", " : ")"}`;
    } else {
      sql.query += `= $${i + 1}${i + 1 < entries.length ? ", " : ""}`;
    }

    sql.array.push(value);
  });

  if (mode === "update") sql.array.push(jefeOrOriCedula);

  const query = sql.query + sql.values;

  return {
    sql:
      mode === "update"
        ? query + ` WHERE cedula = $${sql.array.length}`
        : query,
    values: sql.array,
  };
};

export const addRecord = async (record: ComunalRecord) => {
  const jefeQ = getSql("jefe", record.jefe, undefined, "insert");

  await db.execute(jefeQ.sql, jefeQ.values);

  await Promise.all(
    TABLES.filter(
      (n) => n !== "jefe" && (n as NamedTableName).key !== "family"
    ).map(async (table) => {
      const query = getSql(
        ((table as NamedTableName).name || table) as TableName,
        record[(table as NamedTableName).key || table],
        record.jefe.cedula as number,
        "insert"
      );

      return await db.execute(query.sql, query.values);
    })
  );

  return Promise.all(
    record.family.map(async (fRecord) => {
      const sql = getSql(
        "cargaFamiliar" as unknown as TableName,
        fRecord,
        record.jefe.cedula as number,
        "insert"
      );
      await db.execute(sql.sql, sql.values);
    })
  );
};

export const updateRecord = async (record: ComunalRecord) => {
  const jefeData = { ...record.jefe },
    oriCedula = record.jefe.oriCedula;
  delete jefeData.oriCedula;

  const jefeQ = getSql("jefe", jefeData, oriCedula, "update");

  await db.execute(`${jefeQ.sql}`, jefeQ.values);

  await Promise.all(
    TABLES.filter(
      (n) => n !== "jefe" && (n as NamedTableName).key !== "family"
    ).map(async (table) => {
      const query = getSql(
        ((table as NamedTableName).name || table) as TableName,
        record[(table as NamedTableName).key || table],
        record.jefe.cedula as number,
        "update"
      );

      return await db.execute(query.sql, query.values);
    })
  );

  return Promise.all(
    record.family.map(async (fRecord) => {
      const oriCedula = fRecord.oriCedula;
      delete fRecord.oriCedula;

      const exists = (
        (await db.select("SELECT cedula FROM cargaFamiliar WHERE cedula = ?", [
          oriCedula || fRecord.cedula,
        ])) as { cedula: number }[]
      )[0];

      const sql = getSql(
        "cargaFamiliar" as unknown as TableName,
        fRecord,
        exists ? oriCedula || fRecord.cedula : record.jefe.cedula,
        exists ? "update" : "insert"
      );

      await db.execute(sql.sql, sql.values);
    })
  );
};

export const deleteRecord = async (cedula: number) =>
  db.execute("DELETE FROM jefe WHERE cedula = ?", [cedula]);
