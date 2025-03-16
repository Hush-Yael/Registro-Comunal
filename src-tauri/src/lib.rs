use tauri_plugin_sql::{Migration, MigrationKind};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let migrations = vec![Migration {
        version: 1,
        description: "create_initial_tables",
        sql: r#"
              CREATE TABLE IF NOT EXISTS jefe (
                cedula INTEGER PRIMARY KEY UNIQUE NOT NULL,
                sexo TEXT,
                nombres TEXT,
                apellidos TEXT,
                fechaNacimiento TEXT,
                fechaDeceso	TEXT,
                fallecido	INTEGER NOT NULL DEFAULT 0,
                tel TEXT,
                email TEXT,
                edoCivil TEXT,
                venezolano INTEGER DEFAULT 1,
                nivelEstudios TEXT,
                FOREIGN KEY (cedula) REFERENCES jefe(cedula) ON UPDATE CASCADE ON DELETE CASCADE
              );

              CREATE TABLE IF NOT EXISTS gas (
                cedula INTEGER UNIQUE NOT NULL,
                posee INTEGER,
                '10kg' INTEGER,
                '18kg' INTEGER,
                '27kg' INTEGER,
                '43kg' INTEGER,
                FOREIGN KEY (cedula) REFERENCES jefe(cedula) ON UPDATE CASCADE ON DELETE CASCADE
              );

              CREATE table IF NOT EXISTS viviendas (
                cedula INTEGER NOT NULL,
                calle TEXT,
                avenida TEXT,
                referencia TEXT,
                numCasa TEXT,
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
                cedula INTEGER UNIQUE NOT NULL,
                posee INTEGER,
                FOREIGN KEY (cedula) REFERENCES jefe(cedula) ON UPDATE CASCADE ON DELETE CASCADE
              );

              CREATE TABLE IF NOT EXISTS cargaFamiliar (
                cedula INTEGER PRIMARY KEY UNIQUE NOT NULL,
                jefeCedula INTEGER NOT NULL,
                sexo TEXT,
                nombres TEXT,
                apellidos TEXT,
                fechaNacimiento TEXT,
                fechaDeceso	TEXT,
                fallecido	INTEGER NOT NULL DEFAULT 0,
                venezolano INTEGER NOT NULL DEFAULT 1,
                parentesco TEXT,
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
