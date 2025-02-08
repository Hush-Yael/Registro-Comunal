use tauri_plugin_sql::{Migration, MigrationKind};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let migrations = vec![Migration {
        version: 1,
        description: "create_initial_tables",
        sql: r#"
              CREATE TABLE jefe (
                cedula integer PRIMARY KEY,
                sexo text,
                nombres text,
                apellidos text,
                fechaNacimiento text,
                tel text,
                email text,
                edoCivil text,
                venezolano integer DEFAULT 1,
                nivelEstudios text,
                FOREIGN KEY (cedula) REFERENCES jefe (cedula)
              );

              CREATE TABLE gas (
                cedula integer UNIQUE,
                posee integer,
                '10kg' integer,
                '18kg' integer,
                '27kg' integer,
                '43kg' integer,
                FOREIGN KEY (cedula) REFERENCES jefe (cedula)
              );

              CREATE TABLE vivienda (
                cedula integer PRIMARY KEY,
                calle text,
                avenida text,
                referencia text,
                numCasa text,
                FOREIGN KEY (cedula) REFERENCES jefe (cedula)
              );

              CREATE TABLE carnet (
                cedula integer UNIQUE,
                posee integer,
                FOREIGN KEY (cedula) REFERENCES jefe (cedula)
              );

              CREATE TABLE cargaFamiliar (
                cedula integer PRIMARY KEY,
                jefeCedula integer,
                sexo text,
                nombres text,
                apellidos text,
                fechaNacimiento text,
                parentesco text,
                FOREIGN KEY (jefeCedula) REFERENCES jefe (cedula)
              );

              CREATE TABLE clap (
                cedula integer UNIQUE,
                posee integer,
                cantidad integer DEFAULT 0,
                FOREIGN KEY (cedula) REFERENCES jefe (cedula)
              );
            "#,
        kind: MigrationKind::Up,
    }];

    tauri::Builder::default()
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
