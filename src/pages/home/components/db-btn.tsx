import { JSX } from "solid-js";

type FileBtnProps = Omit<JSX.IntrinsicElements["button"], "title"> & {
  variant?: undefined | "alert" | "danger";
  children: JSX.Element;
};

const variants = {
  alert: `
    hover:!border-orange-400 hover:text-orange-800 hover:dark:text-orange-200 hover:**:fill-orange-700 hover:dark:!border-orange-300 hover:dark:**:fill-orange-300
    focus-visible:!border-orange-400 focus-visible:text-orange-800 focus-visible:dark:text-orange-200 focus-visible:**:fill-orange-700 focus-visible:dark:!border-orange-300 focus-visible:dark:**:fill-orange-300
  `,
  danger: `
    hover:!border-red-500 hover:text-red-800 hover:dark:text-red-200 hover:**:stroke-red-700 hover:dark:**:stroke-red-300
    focus-visible:!border-red-500 focus-visible:text-red-800 focus-visible:dark:text-red-200 focus-visible:**:stroke-red-300  focus-visible:dark:**:stroke-red-300
  `,
};

const Btn = (props: FileBtnProps) => (
  <button
    {...props}
    class={`flex flex-col items-center justify-between gap-1 p-3 px-4 rounded-xl border-1 hover:border-2 focus-visible:!border-2 focus-visible:outline-0 ${
      variants[props.variant as "alert" | "danger"] ||
      " hover:border-[currentColor] focus-visible:border-[currentColor]"
    } border-neutral-400 dark:border-neutral-700 dark:bg-[hsl(0,0%,13%)] text-left shadow-md dark:shadow-[0_1px_3px_rgba(0,0,0,.5)] transition-colors ${
      props.class || ""
    } hover:scale-101 focus-visible:scale-101 font-bold **:transition-colors **:duration-150 **:ease-in`}
    style={{
      transition:
        "color 0.3s ease-in-out, background-color 0.3s ease-in-out, border-color 0.3s ease-in-out, transform 0.1s ease-in-out, scale 0.1s ease-in-out",
    }}
  >
    {props.children}
  </button>
);

export default Btn;
