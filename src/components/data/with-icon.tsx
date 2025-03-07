import { JSX } from "solid-js";

type WithIconsProps = {
  class?: string;
  icon: (p: JSX.IntrinsicElements["svg"]) => JSX.Element;
  iconClass?: string;
  children: JSX.Element;
};

const WithIcon = (props: WithIconsProps) => {
  return (
    <div
      class={`grid grid-cols-[auto_1fr] items-center font-[500] ${
        props.class || ""
      }`}
    >
      <span class="relative h-10 w-10 mr-3 rounded-full bg-neutral-200 dark:bg-[hsl(0,0%,21%)]">
        <props.icon
          class={`absolute inset-1.5 !h-[unset] m-auto ${
            props.iconClass || ""
          }`}
        />
      </span>
      {props.children}
    </div>
  );
};
export default WithIcon;
