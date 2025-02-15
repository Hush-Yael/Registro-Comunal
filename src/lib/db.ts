import SQL from "@tauri-apps/plugin-sql";
import {
  BaseDirectory,
  copyFile,
  readDir,
  remove,
} from "@tauri-apps/plugin-fs";
let db = await SQL.load(`sqlite:db.db`);
import { resolveResource, appDataDir } from "@tauri-apps/api/path";
import { ComunalRecord } from "../types/form";
import { DBComunalRecords, DBSearch } from "../types/db";

export const SQLiteBool = (data: number) =>
  data === 1 ? true : data === 0 ? false : null;

const getAll: { [K in keyof DBComunalRecords]: string } = Object.fromEntries([
  ["jefe", "SELECT * FROM jefe ORDER BY nombres, apellidos"],
  [
    "gas",
    `SELECT jefe.nombres, jefe.apellidos, gas.*, CAST(gas."10kg" + gas."18kg" + gas."27kg" + gas."43kg" as int) AS total FROM GAS JOIN jefe ON jefe.cedula = gas.cedula ORDER BY nombres, apellidos`,
  ],
  ...["vivienda", "carnet", "clap"].map((name) => [
    name,
    `SELECT ${name}.*, jefe.nombres, jefe.apellidos FROM ${name} JOIN jefe ON jefe.cedula = ${name}.cedula ORDER BY nombres, apellidos`,
  ]),
]);

export const getRecords = async (): Promise<DBComunalRecords> =>
  Object.fromEntries(
    await Promise.all(
      Object.keys(getAll).map(async (name) => [
        name,
        await db.select(getAll[name as keyof typeof getAll]),
      ])
    )
  );

export const getRecord = async (cedula: number): Promise<ComunalRecord> => ({
  ...Object.fromEntries(
    await Promise.all(
      (
        [...Object.keys(getAll), "cargaFamiliar"] as (keyof ComunalRecord)[]
      ).map(async (name) => {
        const data = (await db.select(
          `SELECT * FROM ${name} WHERE ${
            name !== "cargaFamiliar" ? "cedula" : "jefeCedula"
          } = $1`,
          [cedula]
        )) as [ComunalRecord[keyof ComunalRecord]];
        return [name, name !== "cargaFamiliar" ? data[0] : data];
      })
    )
  ),
  gas: (
    await db.select(
      `SELECT *, CAST("10kg" + "18kg" + "27kg" + "43kg" as int) AS total FROM GAS WHERE cedula = $1`,
      [cedula]
    )
  )[0],
});

export const getOverview = async (): Promise<{
  [K in keyof ComunalRecord]: number;
}> => {
  const values: {
    [K in keyof ComunalRecord]: { [key: string]: number }[];
  } = {
    jefe: await db.select("SELECT COUNT(cedula) FROM jefe"),
    vivienda: await db.select("SELECT COUNT(cedula) FROM vivienda"),
    cargaFamiliar: await db.select(
      "SELECT COUNT(DISTINCT(jefeCedula)) FROM cargaFamiliar"
    ),
    carnet: await db.select(
      "SELECT COUNT(cedula) FROM carnet WHERE posee == 1"
    ),
    clap: await db.select("SELECT COUNT(cedula) FROM clap WHERE posee == 1"),
    gas: await db.select("SELECT COUNT(cedula) FROM gas WHERE posee == 1"),
  };

  Object.entries(values).forEach(([key, value]) => {
    // @ts-ignore
    values[key as keyof ComunalRecord] = Object.values(value[0])[0] as number;
  });

  return values;
};

const filteredQueries = (filter: keyof ComunalRecord) => {
  switch (filter) {
    case "jefe": {
      return `SELECT 
          cedula, nombres, apellidos, sexo, venezolano, fechaNacimiento, edoCivil
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
