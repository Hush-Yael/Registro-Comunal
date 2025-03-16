use tauri_plugin_sql::{Migration, MigrationKind};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let migrations = vec![Migration {
        version: 1,
        description: "create_initial_tables",
        sql: r#"
              CREATE TABLE IF NOT EXISTS jefe (
                cedula integer PRIMARY KEY UNIQUE NOT NULL,
                sexo text,
                nombres text,
                apellidos text,
                fechaNacimiento text,
                fechaDeceso	TEXT,
                fallecido	INTEGER NOT NULL DEFAULT 0,
                tel text,
                email text,
                edoCivil text,
                venezolano integer DEFAULT 1,
                nivelEstudios text,
                FOREIGN KEY (cedula) REFERENCES jefe(cedula) ON UPDATE CASCADE ON DELETE CASCADE
              );

              CREATE TABLE IF NOT EXISTS gas (
                cedula integer UNIQUE NOT NULL,
                posee integer,
                '10kg' integer,
                '18kg' integer,
                '27kg' integer,
                '43kg' integer,
                FOREIGN KEY (cedula) REFERENCES jefe(cedula) ON UPDATE CASCADE ON DELETE CASCADE
              );

              CREATE TABLE IF NOT EXISTS viviendas (
                cedula integer NOT NULL,
                calle text,
                avenida text,
                referencia text,
                numCasa text,
                id TEXT NOT NULL UNIQUE,
                PRIMARY KEY(id),
                FOREIGN KEY (cedula) REFERENCES jefe(cedula) ON UPDATE CASCADE ON DELETE CASCADE
              );

              CREATE TABLE IF NOT EXISTS negocios (
                RIF	INTEGER UNIQUE,
                nombre TEXT NOT NULL UNIQUE,
                cedula INTEGER NOT NULL,
                calle	TEXT,
                avenida	TEXT,
                tipo	TEXT,
                PRIMARY KEY(nombre),
                FOREIGN KEY(cedula) REFERENCES jefe(cedula) ON UPDATE CASCADE ON DELETE CASCADE
              );

              CREATE TABLE IF NOT EXISTS carnet (
                cedula integer UNIQUE NOT NULL,
                posee integer,
                FOREIGN KEY (cedula) REFERENCES jefe(cedula) ON UPDATE CASCADE ON DELETE CASCADE
              );

              CREATE TABLE IF NOT EXISTS cargaFamiliar (
                cedula integer PRIMARY KEY,
                jefeCedula INTEGER NOT NULL,
                sexo text,
                nombres text,
                apellidos text,
                fechaNacimiento text,
                fechaDeceso	TEXT,
                fallecido	INTEGER NOT NULL DEFAULT 0,
                venezolano INTEGER NOT NULL DEFAULT 1,
                parentesco text,
                FOREIGN KEY (jefeCedula) REFERENCES jefe(cedula) ON UPDATE CASCADE ON DELETE CASCADE
              );

              CREATE TABLE IF NOT EXISTS clap (
                cedula INTEGER UNIQUE NOT NULL,
                posee INTEGER,
                cantidad INTEGER DEFAULT 0,
                FOREIGN KEY (cedula) REFERENCES jefe(cedula) ON UPDATE CASCADE ON DELETE CASCADE
              );
            "#,
        kind: MigrationKind::Up,
    }];

    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(
            tauri_plugin_sql::Builder::default()
                .add_migrations("sqlite:db.db", migrations)
                .build(),
        )
        .plugin(tauri_plugin_opener::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
