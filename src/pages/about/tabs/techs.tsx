import * as Icons from "../../../icons/techs";
import Tech from "../components/tech";

const Techs = () => {
  return (
    <ul class="flex flex-col py-3 gap-3 max-w-[1100px] m-auto sm:grid md:grid-cols-2">
      <Tech icon={Icons.Tauri} title="Tauri">
        Permitió la instalación de la aplicación de manera nativa con{" "}
        <span class="font-[500]">
          <Icons.Rust class="inline ml-1 translate-[-1px]" /> Rust
        </span>
      </Tech>

      <Tech icon={Icons.Rust} title="Rust">
        Lenguaje de programación utilizado por{" "}
        <span class="font-[500]">
          <Icons.Tauri class="inline" /> Tauri
        </span>{" "}
        para compilar la aplicación y obtener acceso a las APIs nativas
      </Tech>

      <Tech icon={Icons.Vite} title="Vite">
        Proveyó el servidor de desarrollo y el empaquetador de módulos
      </Tech>

      <Tech icon={Icons.SQLite} title="SQLite">
        Gestor de bases de datos utilizado en el proyecto
      </Tech>

      <Tech icon={Icons.Solid} title="SolidJS">
        Librería utilizada para el desarrollo de las interfaces y su interacción
      </Tech>

      <Tech icon={Icons.JS} title="JavaScript">
        Lenguaje de programación encargado de la lógica de la aplicación y la
        generación de la interfaz
      </Tech>

      <Tech icon={Icons.TS} title="TypeScript">
        Lenguaje de programación servido por encima de{" "}
        <span class="font-[500]">
          <Icons.JS class="inline ml-1 translate-[-2px]" /> JavaScript
        </span>
        , para agilizar el desarrollo y evitar errores en producción
      </Tech>

      <Tech icon={Icons.Tailwind} title="Tailwind">
        Librería de estilos{" "}
        <span class="font-[500]">
          <Icons.CSS class="inline ml-1 translate-[-2px]" /> CSS
        </span>{" "}
        que permitió diseñar una apariencia moderna de forma fácil y rápida
      </Tech>

      <Tech icon={Icons.CSS} title="CSS">
        Lenguaje encargado de la apariencia de la aplicación
      </Tech>

      <Tech icon={Icons.HTML} title="HTML">
        La base de la web, que define el contenido y permite utilizar algunas
        tecnologías ya mencionadas
      </Tech>

      <Tech icon={Icons.Git} title="Git">
        Herramienta utilizada para el control de versiones
      </Tech>
    </ul>
  );
};
export default Techs;
