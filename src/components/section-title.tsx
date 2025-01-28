import { JSX } from "solid-js";
import Hr from "./divider";

const SectionTitle = (props: { children: JSX.Element }) => {
  return (
    <>
      <h2 class="flex justify-between items-center gap-2 text-2xl font-bold">
        {props.children}
      </h2>
      <Hr />
    </>
  );
};
export default SectionTitle;
