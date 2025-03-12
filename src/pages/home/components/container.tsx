import { JSX } from "solid-js";

const Container = (props: { children: JSX.Element }) => {
  return (
    <div class="grid grid-cols-2 items-start gap-4 max-[450px]:grid-cols-1 *:h-full">
      {props.children}
    </div>
  );
};
export default Container;
