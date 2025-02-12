import { JSX } from "solid-js";

type FileBtnProps = Omit<JSX.IntrinsicElements["button"], "title"> & {
  variant?: undefined | "alert" | "danger";
  children: JSX.Element;
};

const variants = {
  alert: `
    bg-[hsl(49_100%_85%)]
    text-[hsl(49_50%_20%)]
    dark:hover:bg-[hsl(49_90%_80%)]
    dark:!border-amber-300
  `,
  danger: `
    border-red-700 dark:border-red-400
    btn-primary-danger
  `,
};

const Btn = (props: FileBtnProps) => (
  <button
    {...props}
    class={`flex flex-col items-center gap-2 p-3 px-4 rounded-xl border-1 ${
      variants[props.variant as "alert" | "danger"] || " btn-primary"
    } text-left shadow-[0_1px_2px_rgba(0,0,0,0.3)] dark:shadow-[0_1px_3px_rgba(0,0,0,.5)] transition-colors ${
      props.class || ""
    }`}
  >
    <p class="flex justify-center items-center gap-2 w-full font-bold text-lg">
      {props.children}
    </p>
  </button>
);

export default Btn;
