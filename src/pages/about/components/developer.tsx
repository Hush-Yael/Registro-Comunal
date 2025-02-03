import { Show } from "solid-js";
import { Email, Person, Tel } from "../../../icons";

type Props = {
  role: "main" | "secondary";
  name: string;
  imgSrc?: string;
};

const Developer = (props: Props) => {
  const imgDimensions = props.role === "main" ? "size-[6em]" : "!size-[4em]";

  return (
    <div class="grid grid-cols-[auto_1fr] gap-x-3.5 gap-y-2 gray-container-100">
      {props.imgSrc ? (
        <img
          class={`rounded-full object-cover ${imgDimensions}`}
          src={props.imgSrc}
          alt="imagen de desarrollador"
        />
      ) : (
        <Person class={imgDimensions} />
      )}
      <div class="flex flex-col justify-center  w-fit">
        <span
          class={`${props.role === "main" ? "text-2xl" : "text-lg"} font-bold`}
        >
          {props.name}
        </span>
        <span class={`${props.role === "secondary" ? "text-sm" : ""} fore`}>
          {props.role === "main"
            ? "Desarrollador principal"
            : "Colaborador en el proyecto"}
        </span>
      </div>
      <Show when={props.role === "main"}>
        <div class="col-span-2 px-2">
          <p>Para soporte o sugerencias, contactar a: </p>
          <div class="flex flex-wrap gap-x-2 py-1 text-sky-600 dark:text-sky-400">
            <a class="flex items-center gap-1" href="mailto:srjean21@gmail.com">
              <Email /> srjean21@gmail.com
            </a>
            <a class="flex items-center gap-0.5" href="tel:+584127734204">
              <Tel /> 0412-7734204
            </a>
          </div>
        </div>
      </Show>
    </div>
  );
};
export default Developer;
