import { Person } from "../../../icons";

type Props = {
  role: "main" | "secondary";
  name: string;
  imgSrc?: string;
};

const Developer = (props: Props) => {
  const imgDimensions = props.role === "main" ? "size-[10em]" : "!size-[1.5em]";

  return (
    <div
      class={`flex ${
        props.role === "main" ? "flex-col" : ""
      } items-center gap-2`}
    >
      {props.imgSrc ? (
        <img
          class={`rounded-full object-cover ${imgDimensions}`}
          src={props.imgSrc}
          alt="imagen de desarrollador"
        />
      ) : (
        <Person class={imgDimensions} />
      )}
      <p class="flex flex-col justify-center w-fit">
        <span
          class={`${props.role === "main" ? "text-2xl" : "text-lg"} font-bold`}
        >
          {props.name}
        </span>
        {props.role === "main" && (
          <span class="fore">Desarrollador principal</span>
        )}
      </p>
    </div>
  );
};
export default Developer;
