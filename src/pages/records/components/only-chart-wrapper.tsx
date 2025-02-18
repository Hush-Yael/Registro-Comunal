import { JSX } from "solid-js";

const Wrapper = (props: { children: JSX.Element }) => {
  return (
    <div class="flex flex-wrap justify-center gap-5 p-2">{props.children}</div>
  );
};
export default Wrapper;
