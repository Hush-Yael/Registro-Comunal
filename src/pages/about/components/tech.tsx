import { JSX } from "solid-js";

type Props = {
  icon: (props: JSX.IntrinsicElements["svg"]) => JSX.Element;
  title: string;
  description: JSX.Element;
};

const Tech = (props: Props) => {
  return (
    <div class="grid grid-cols-[auto_1fr] items-center gap-3.5 gray-container-100">
      <props.icon class="h-[2.5em]" />
      <div>
        <span class="font-bold">{props.title}</span>
        <p class="text-sm fore">{props.description}</p>
      </div>
    </div>
  );
};
export default Tech;
