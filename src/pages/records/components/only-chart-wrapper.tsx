import { JSX } from "solid-js";

const Wrapper = (props: { children: JSX.Element }) => {
  return (
    <div class="flex flex-col justify-center max-[1100px]:items-center gap-5 p-2 min-[1100px]:flex-row-reverse">
      {props.children}
    </div>
  );
};
export default Wrapper;
