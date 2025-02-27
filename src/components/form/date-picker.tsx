import "@rnwonder/solid-date-picker/dist/style.css";
import DATEPICKER from "@rnwonder/solid-date-picker";
import utils from "@rnwonder/solid-date-picker/utilities";
import { Date as Icon } from "../../icons/form";
import { InputProps } from "../input";
import { createSignal } from "solid-js";

type DatePickerProps = Pick<InputProps, "variant" | "inputClass"> & {
  class?: string;
  id?: string;
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
};

const DatePicker = (props: DatePickerProps) => {
  const [value, setValue] = createSignal<any | undefined>(
    props.value
      ? {
          value: {
            selectedDateObject: utils().convertDateToDateObject(
              new Date(props.value!)
            ),
          },
        }
      : undefined
  );

  return (
    <div
      class={`grid grid-cols-[1fr_auto] items-center gap-2 ${
        props.variant || "input-solid"
      } ${props.class || ""}`}
    >
      <input
        type="date"
        class={props.inputClass}
        onBlur={(e) => {
          const v = e.target.value;
          props.onChange && props.onChange(v);
          const date = v.split("-");

          setValue({
            value: {
              selectedDateObject: {
                year: parseInt(date[0]),
                month: parseInt(date[1]) - 1,
                day: parseInt(date[2]),
              },
            },
          });
        }}
        id={props.id}
        name={props.id}
        value={props.value}
        max={utils().formatDate(utils().getToday(), {
          format: "yyyy-mm-dd",
        })}
      />
      <DATEPICKER
        locale="es"
        value={value}
        setValue={setValue}
        // @ts-ignore
        onChange={({ selectedDate }) => {
          const date = utils().formatDate(selectedDate, {
            format: "yyyy-mm-dd",
          });

          props.onChange && props.onChange(date);
        }}
        maxDate={utils().getToday()}
        monthSelectorTopLabel="Seleccionar mes"
        renderInput={({ showDate }) => (
          <button
            class={`input-solid !p-1.5 ${
              props.variant === "input-dash" ? "translate-[-2px]" : ""
            }`}
            onClick={showDate}
            title="Seleccionar fecha"
          >
            <Icon class="!size-[.9em]" />
          </button>
        )}
      />
    </div>
  );
};
export default DatePicker;
