import { createEffect, createSignal, JSX } from "solid-js";
import { setExternalFilter } from "./table";
import Select from "../../../components/form/select";

const WithSelectFallecidos = (props: {
  children: JSX.Element;
  hidden?: boolean;
}) => {
  const options = [
    { value: "null", label: "Todos" },
    {
      value: 1,
      label: "Fallecidos",
    },
    { value: 0, label: "No fallecidos" },
  ];
  const [filter, setFilter] = createSignal(options[0]);

  createEffect(() => {
    setExternalFilter(
      // @ts-expect-error
      filter().value === "null"
        ? undefined
        : {
            path: "fallecido",
            value: filter().value,
          }
    );
  });

  return (
    <div class="flex flex-col gap-2 p-2 max-w-max m-auto">
      <Select
        inputClass={`!p-2 !px-4 ${props.hidden ? "hidden" : ""}`}
        name="fallecidos"
        options={options}
        useObject
        notNull
        value={filter()}
        onChange={setFilter}
        parseValueText={(value) => (
          <>
            <span class="font-[400]">Mostrando: </span>
            {value}
          </>
        )}
      />
      {props.children}
    </div>
  );
};
export default WithSelectFallecidos;
