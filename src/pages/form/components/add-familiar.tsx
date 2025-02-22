import { JSX } from "solid-js";
import { AddFamiliar as Icon } from "../../../icons/form";
import { familyTabMsgClass } from "./family-form-tabs";

const AddFamiliar = (props: JSX.IntrinsicElements["button"]) => {
  return (
    <button
      type="button"
      style={{ "border-style": "dashed solid" }}
      class={`${familyTabMsgClass} border-neutral-400 dark:border-neutral-600 hover:border-neutral-600 dark:hover:border-neutral-400  w-full font-[500] tracking-wide gray hover:!text-black dark:hover:!text-white text-lg transition-colors duration-350`}
      {...props}
    >
      <Icon class="min-h-[2.5em]" />
      Presiona para agregar un familiar
    </button>
  );
};
export default AddFamiliar;
