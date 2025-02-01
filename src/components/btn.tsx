import { JSX } from "solid-js";

type BtnProps = JSX.IntrinsicElements["button"] & {
  variant?:
    | "primary"
    | "primary-danger"
    | "secondary"
    | "outline"
    | "outline-danger";
  thickness?: "sm" | "md" | "lg";
};

const Btn = (props: BtnProps) => {
  const fill = !props.variant ? "" : `btn-${props.variant}`,
    thickness = `${
      !props.thickness || props.thickness === "sm"
        ? "py-1.5 px-3"
        : props.thickness === "md"
        ? "py-2 px-4"
        : "p-2.5 px-5"
    }`;

  return (
    <button
      type="button"
      {...props}
      class={`btn ${fill} ${thickness} ${props.class}`}
      // @ts-expect-error: se evitan pasar las props no reales del elemento
      variant={null}
      thickness={null}
    >
      {props.children}
    </button>
  );
};
export default Btn;
