import SQL from "@tauri-apps/plugin-sql";
import {
  BaseDirectory,
  copyFile,
  readDir,
  remove,
} from "@tauri-apps/plugin-fs";
let db = await SQL.load(`sqlite:db.db`);
import { resolveResource, appDataDir } from "@tauri-apps/api/path";
import {
  ComunalRecord,
  HabitanteData,
  HomePath,
  RecordKey,
  RecordPath,
  RecordValues,
} from "../types/form";
import {
  AgesRange,
  TableRecord,
  TableRecords,
  DBSearch,
  DBComunalRecord,
} from "../types/db";
import { EDOS_CIVIL, NIVELES_ESTUDIOS } from "../constants";
import { parseWithSex } from "./utils";
import { Form } from "../pages/form";

type TableName = "jefe" | "family" | "homes" | "clap" | "gas" | "carnet";

type NamedTableName = { name: string; key: TableName };

const TABLES: (TableName | NamedTableName)[] = [
  { name: "viviendas", key: "homes" },
  "jefe",
  "clap",
  "gas",
  "carnet",
  { name: "cargaFamiliar", key: "family" },
];

const EXPECT_MULTIPLE = ["viviendas", "cargaFamiliar", "negocios"] as const;
type ArrayTable = (typeof EXPECT_MULTIPLE)[number];

const TRANSLATIONS = {
  viviendas: "homes",
  cargaFamiliar: "family",
  negocios: "business",
} as const;

const sqlGetYears = `cast(strftime('%Y.%m%d', 'now') - strftime('%Y.%m%d', fechaNacimiento) as int) AS edad`;

const getFullName = (name: string) =>
  `JOIN jefe ON jefe.cedula = ${name}.cedula ORDER BY nombres, apellidos`;

const query = (name: string) =>
  `SELECT ${name}.*, jefe.nombres, jefe.apellidos FROM ${name} ${getFullName(
    name
  )}`;

const getOnly = async <T extends unknown>(query: string) => {
  const q = await db.select(query);
  return Object.values((q as [{ [key: string]: T }])[0])[0];
};

// @returns un objeto con la estructura { [key: <nombreDeLaColumna> de acuerdo al valor]: number }
const getCountMap = async <
  TName extends TableName,
  P extends RecordPath<TName>
>(
  tableName: TName,
  column: P
): Promise<{
  // key: el el value de la columna, value: la cantidad a mostrar en el gráfico
  [L in TableRecord<TName>[P] as string | number | symbol]: number;
}> => {
  const data = (await db.select(
    `SELECT ${column as string}, COUNT(*) AS total FROM ${tableName} GROUP BY ${
      column as string
    }`
  )) as ({ [K in keyof ComunalRecord[TName]]: unknown } & { total: number })[];

  return Object.fromEntries(data.map((c) => [c[column], c.total]));
};

const jefeMap = async <
  Path extends RecordPath<"jefe">,
  Values extends RecordValues<"jefe", Path>
>(
  column: Path,
  matches: {
    // key: el value de la columna, value: el texto a mostrar como label
    [P in Path as string | number | symbol]: string;
  }
) => {
  const map = await getCountMap("jefe", column);
  return Object.entries(matches).map(([match]) => [
    {
      match,
      text: matches[match] || match || "desconocido",
      value: map[match] || 0,
    },
  ]) as unknown as {
    match: Values;
    text: string;
    value: number;
  }[];
};

export const getRecords = async (): Promise<TableRecords> => ({
  jefe: {
    records: await db.select(
      `SELECT *, ${sqlGetYears} FROM jefe ORDER BY nombres, apellidos`
    ),
    charts: {
      sexo: await jefeMap("sexo", {
        M: "Masculino",
        F: "Femenino",
      }),
      nivelEstudios: await jefeMap(
        "nivelEstudios",
        Object.fromEntries(
          NIVELES_ESTUDIOS.map((n) => [n, parseWithSex("", n, "o/a")]).concat([
            ["desconocido", ""],
          ])
        )
      ),
      edoCivil: await jefeMap(
        "edoCivil",
        Object.fromEntries(
          EDOS_CIVIL.map((n) => [n, parseWithSex("", n, "o/a")]).concat([
            ["desconocido", ""],
          ])
        )
      ),
      venezolano: await jefeMap("venezolano", {
        1: "Venezolano/a",
        0: "Extranjero/a",
      }),
      edades: {
        ...(
          (await db.select(`
            WITH edades as (
              SELECT ${sqlGetYears} FROM jefe 
                WHERE fechaNacimiento IS NOT NULL AND fechaNacimiento != "" AND fallecido != 1
              )
              SELECT IFNULL(MAX(edad), 0) as mayor, IFNULL(MIN(edad), 0) as menor, IFNULL(ROUND(AVG(edad)), 0) AS promedio FROM edades
          `)) as [{ mayor: number; menor: number; promedio: number }]
        )[0],
        range: Object.fromEntries(
          Object.entries(
            (
              (await db.select(
                `SELECT ${sqlGetYears} FROM jefe WHERE edad IS NOT NULL AND fallecido != 1`
              )) as { edad: number }[]
            ).reduce(
              (
                c: Omit<AgesRange, "infantes" | "niños" | "adolescentes">,
                { edad }
              ) => {
                const curr =
                  c && (c as unknown as { edad: number }).edad
                    ? {
                        jóvenes: 0,
                        adultos: 0,
                        ancianos: 0,
                      }
                    : c;

                if (edad >= 20 && edad <= 25) curr.jóvenes += 1;
                else if (edad >= 25 && edad <= 60) curr.adultos += 1;
                else if (edad >= 60) curr.ancianos += 1;

                return curr;
              },
              {
                jóvenes: 0,
                adultos: 0,
                ancianos: 0,
              }
            )
          )
        ),
      },
      fallecido: await jefeMap("fallecido", {
        1: "Sí",
        0: "No",
      }),
    },
  },
  homes: await db.select(query("viviendas")),
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
    ...(
      (await db.select(
        `SELECT SUM(suma) AS total, ROUND(AVG(suma), 2) AS promedio
      FROM (
        SELECT
          CAST(gas."10kg" + gas."18kg" + gas."27kg" + gas."43kg" as int) AS suma FROM gas
        WHERE posee == 1
      )`
      )) as [{ total: number; promedio: number }]
    )[0],
    spread: {
      ...(
        (await db.select(
          `SELECT IFNULL(SUM("10kg"),0) as "10kg", IFNULL(SUM("18kg"),0) as "18kg", IFNULL(SUM("27kg"),0) as "27kg", IFNULL(SUM("43kg"),0) as "43kg" FROM gas`
        )) as [
          { "10kg": number; "18kg": number; "27kg": number; "43kg": number }
        ]
      )[0],
    },
  },
});

export const checkCedula = async (cedula: number, familiar = false) => {
  const [ya] = (await (!familiar
    ? db.select(`SELECT cedula FROM jefe WHERE cedula = $1`, [cedula])
    : db.select(
        "SELECT cedula FROM cargaFamiliar WHERE cedula = $1 AND jefeCedula = $2",
        [cedula, Form.state.values.jefe.cedula]
      ))) as [number];
  return ya;
};

export const checkNumCasa = async (cedula: number | "", numCasa: HomePath) => {
  if (!cedula) return 0;

  const [ya] = (await db.select(
    `SELECT cedula FROM viviendas WHERE cedula = $1 and numCasa = $2`,
    [cedula, numCasa]
  )) as [number];
  return ya;
};

export const checkRIF = async (rif: number) => {
  const [ya] = (await db.select(`SELECT RIF FROM negocios WHERE RIF = $1`, [
    rif,
  ])) as [number];
  return ya;
};

export const checkBName = async (nombre: string) => {
  const [ya] = (await db.select(
    `SELECT nombre FROM negocios WHERE nombre = $1`,
    [nombre]
  )) as [number];
  return ya;
};

export const getRecord = async (cedula: number): Promise<DBComunalRecord> => ({
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
    jefe: await getOnly("SELECT COUNT(cedula) FROM jefe"),
    home: await getOnly("SELECT COUNT(cedula) FROM vivienda"),
    family: await getOnly(
      "SELECT COUNT(DISTINCT(jefeCedula)) FROM cargaFamiliar"
    ),
    carnet: await getOnly("SELECT COUNT(cedula) FROM carnet WHERE posee == 1"),
    clap: await getOnly("SELECT COUNT(cedula) FROM clap WHERE posee == 1"),
    gas: await getOnly("SELECT COUNT(cedula) FROM gas WHERE posee == 1"),
  };

  return values as { [K in RecordKey]: number };
};

const filteredQueries = (filter: RecordKey) => {
  switch (filter) {
    case "jefe": {
      return `SELECT cedula, nombres, apellidos, sexo, venezolano, fechaNacimiento, edoCivil, ${sqlGetYears} FROM jefe`;
    }
    case "family": {
      return `SELECT 
          cargaFamiliar.cedula, cargaFamiliar.nombres, cargaFamiliar.apellidos, cargaFamiliar.sexo, cargaFamiliar.parentesco, jefe.cedula AS jefeCedula, jefe.nombres AS jefeNombres, jefe.apellidos AS jefeApellidos
        FROM cargaFamiliar
        JOIN jefe ON jefe.cedula = cargaFamiliar.jefeCedula
      `;
    }
    case "homes": {
      return `SELECT viviendas.*, jefe.nombres, jefe.apellidos FROM viviendas JOIN jefe ON jefe.cedula = viviendas.cedula`;
    }
    default:
      throw new Error("Invalid filter");
  }
};

const FILTER_PATHS: {
  [K in keyof DBSearch]: {
    [K in keyof Partial<DBSearch[keyof DBSearch]>]: string;
  };
} = {
  jefe: { cedula: "cast(cedula as string)" },
  family: {
    cedula: "cast(cargaFamiliar.cedula as string)",
    nombres: "cargaFamiliar.nombres",
    apellidos: "cargaFamiliar.apellidos",
    // @ts-ignore
    jefeCedula: "cast(jefe.cedula as string)",
    jefeNombres: "jefe.nombres",
    jefeApellidos: "jefe.apellidos",
  },
  homes: {
    cedula: "cast(jefe.cedula as string)",
    nombres: "jefe.nombres",
    apellidos: "jefe.apellidos",
  },
};

export const searchRecords = async <Table extends keyof DBSearch>(
  query: string,
  filter: Table,
  paths: (keyof DBSearch[Table])[]
): Promise<DBSearch[Table][]> => {
  if (!filter.length) return [];

  const cols = filteredQueries(filter);
  return await db.select(
    `${cols} WHERE ${paths
      .map((path) => `${FILTER_PATHS[filter][path as string] || path} LIKE ?`)
      .join(" OR ")}`,
    // se indican tantos % como columnas en la consulta
    Array.from({ length: paths.length }, () => `%${query}%`)
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

const getTables = async () =>
  (
    (await db.select(`SELECT name
      FROM sqlite_schema
      WHERE  type ='table' AND name NOT LIKE 'sqlite_%' AND name NOT LIKE '_sqlx%';
  `)) as { name: string }[]
  ).map((t) => t.name as TableName);

const getPks = (tableName: TableName): Promise<{ name: string }[]> =>
  db.select(
    `SELECT l.name FROM pragma_table_info("${tableName}") as l WHERE l.pk <> 0`
  );

export const getToModify = async (cedula: number): Promise<ComunalRecord> => {
  const tables = await getTables();

  return Object.fromEntries(
    await Promise.all(
      tables.map(async (tableName) => {
        const pks = await getPks(tableName);

        const all = (await db.select(
          `SELECT * ${
            pks.length
              ? "," +
                pks
                  .map(
                    (pk) =>
                      `${pk.name} as ori${
                        pk.name.charAt(0).toUpperCase() + pk.name.slice(1)
                      }`
                  )
                  .join(",")
              : ""
          } FROM ${tableName} WHERE ${
            // @ts-expect-error
            tableName === "cargaFamiliar" ? "jefeCedula" : "cedula"
          } = ?`,
          [cedula]
        )) as { [key: string]: unknown }[];

        const parsed = all.map((item) => {
          tableName !== "jefe" &&
            // @ts-expect-error
            tableName !== "cargaFamiliar" &&
            delete item.cedula;
          delete item.jefeCedula;

          return item;
        });

        return [
          TRANSLATIONS[tableName] || tableName,
          !EXPECT_MULTIPLE.includes(tableName as ArrayTable)
            ? parsed[0]
            : parsed,
        ];
      })
    )
  );
};

type GetSqlProps<TName extends TableName, M extends "insert" | "update"> = {
  tableName: TName;
  values: ComunalRecord[RecordKey] | HabitanteData;
  mode: M;
} & (M extends "update" ? { primaryKey?: string; oriPKValue?: unknown } : {});

const getSql = <TName extends TableName, M extends "insert" | "update">(
  args: GetSqlProps<TName, M>
) => {
  const sql: { query: string; values: string; array: unknown[] } = {
    query: `${args.mode === "update" ? "UPDATE" : "INSERT INTO"} ${
      args.tableName
    } ${args.mode === "update" ? "SET " : "("}`,
    values: args.mode === "update" ? "" : " values (",
    array: [],
  };

  const entries = Object.entries(args.values);

  // se añaden los nombres de las columnas y los valores en el orden correcto
  entries.forEach(([cName, value], i) => {
    const colName = cName.match(/^\d/) ? `"${cName}"` : cName;
    sql.query += `${colName}`;

    if (args.mode === "insert") {
      sql.query += `${i + 1 < entries.length ? ", " : ")"}`;
      sql.values += `$${i + 1}${i + 1 < entries.length ? ", " : ")"}`;
    } else {
      sql.query += ` = $${i + 1}${i + 1 < entries.length ? ", " : ""}`;
    }

    sql.array.push(value);
  });

  // se añade el valor original de la llave primaria al final, para poder comparar en el WHERE correctamente y actualizarla si es necesario
  if (args.mode === "update")
    sql.array.push((args as GetSqlProps<TName, "update">).oriPKValue);

  const query = sql.query + sql.values;

  return {
    sql:
      args.mode === "update"
        ? query +
          ` WHERE ${(args as GetSqlProps<TName, "update">).primaryKey} = $${
            sql.array.length
          }`
        : query,
    values: sql.array,
  };
};

const ArrayTablesPrimaryKey = {
  cargaFamiliar: "Cedula",
  negocios: "Nombre",
  viviendas: "Id",
  family: "Cedula",
  business: "Nombre",
  homes: "Id",
};

const checkExistence = async (
  tableName: ArrayTable,
  item: any,
  oriKey: string,
  primaryKey: string
) =>
  ((
    (await db.select(
      `SELECT ${primaryKey} FROM ${tableName} WHERE ${primaryKey} = ?`,
      [item[oriKey] || item[primaryKey]]
    )) as { cedula: number }[]
  )[0] as unknown as number) !== undefined;

const put = async (record: ComunalRecord, putKind: "update" | "insert") => {
  // se separan las tablas que reciben un solo registro y las que reciben un array
  const tables = {
    single: TABLES.filter(
      (n) =>
        n !== "jefe" &&
        EXPECT_MULTIPLE.indexOf(
          ((n as NamedTableName).name || n) as ArrayTable
        ) === -1
    ),
    multiple: TABLES.filter((n) =>
      EXPECT_MULTIPLE.includes(((n as NamedTableName).name || n) as ArrayTable)
    ),
  };

  // se modifican las tablas que reciben un solo registro
  await Promise.all(
    tables.single.map(async (table) => {
      const values = record[(table as NamedTableName).key || table];

      //* se le pasa la cédula del jefe al insertar para poder hacer la relación, ya que es su clave primaria
      //! no se pasa al actualizar, ya que esta se actualiza de forma automática (CASCADE)
      // @ts-expect-error
      if (putKind === "insert") values.cedula = record.jefe.cedula;

      const query = getSql({
        tableName: ((table as NamedTableName).name || table) as TableName,
        values,
        primaryKey: "cedula",
        mode: putKind,
      });

      return await db.execute(query.sql, query.values);
    })
  );

  // se modifican las tablas que reciben un array
  return Promise.all(
    tables.multiple.map(async (table) => {
      const tableKey = (table as NamedTableName).key || table,
        tableName = ((table as NamedTableName).name || table) as TableName,
        recordList = record[tableKey] as ComunalRecord[
          | "family"
          | "business"
          | "homes"];

      return Promise.all(
        recordList.map(async (item) => {
          const itemPrimaryKey = ArrayTablesPrimaryKey[tableName],
            itemOriKey = "ori" + itemPrimaryKey;

          const exists =
            putKind === "update"
              ? await checkExistence(
                  tableName as ArrayTable,
                  item,
                  itemOriKey,
                  itemPrimaryKey.toLowerCase()
                )
              : undefined;

          // se guarda el valor original de la llave primaria para poder comparar en el WHERE correctamente
          const oriPKValue = item[itemOriKey];
          // se elimina el campo con el valor original de la clave primaria (prefijada con "ori", [original]), para evitar que se intente añadir como parte de la query
          delete item[itemOriKey];

          if (putKind === "insert")
            //* se le pasa la cédula del jefe al insertar para poder hacer la relación, ya que es su clave foránea
            //! no se pasa al actualizar, ya que esta se actualiza de forma automática (CASCADE)
            // @ts-expect-error
            item[tableName === "cargaFamiliar" ? "jefeCedula" : "cedula"] =
              record.jefe.cedula;

          const { sql, values } = getSql({
            tableName,
            values: item,
            primaryKey: itemPrimaryKey.toLowerCase(),
            oriPKValue,
            mode: exists ? "update" : "insert",
          });

          return await db.execute(sql, values);
        })
      );
    })
  );
};

export const addRecord = async (record: ComunalRecord) => {
  const jefeQ = getSql({
    tableName: "jefe",
    values: record.jefe,
    mode: "insert",
  });

  await db.execute(jefeQ.sql, jefeQ.values);
  return await put(record, "insert");
};

export const updateRecord = async (record: ComunalRecord) => {
  const jefeData = { ...record.jefe },
    oriCedula = record.jefe.oriCedula;
  delete jefeData.oriCedula;

  const jefeQ = getSql({
    tableName: "jefe",
    values: jefeData,
    primaryKey: "cedula",
    oriPKValue: oriCedula,
    mode: "update",
  });

  await db.execute(jefeQ.sql, jefeQ.values);
  return await put(record, "update");
};

export const deleteRecord = async (cedula: number) =>
  db.execute("DELETE FROM jefe WHERE cedula = ?", [cedula]);
