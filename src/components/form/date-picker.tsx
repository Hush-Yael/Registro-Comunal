import "@rnwonder/solid-date-picker/dist/style.css";
import DATEPICKER from "@rnwonder/solid-date-picker";
import utils from "@rnwonder/solid-date-picker/utilities";
import { Date as Icon } from "../../icons/form";
import { InputProps } from "./input";
import { createEffect, createSignal } from "solid-js";

type DatePickerProps = Pick<InputProps, "variant" | "inputClass"> & {
  class?: string;
  id?: string;
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  max?: string;
  min?: string;
};

const getDateObject = (date: string) => {
  const [year, month, day] = date
    .split("-")
    .map((n, i) => parseInt(n) - (i === 1 ? 1 : 0));
  return {
    year,
    month,
    day,
  };
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
        class={`outline-0 ${props.inputClass}`}
        onBlur={(e) => {
          const v = e.target.value,
            date = v ? getDateObject(v) : utils().getToday();
          props.onChange && props.onChange(v);

          setValue({
            value: {
              selectedDateObject: date,
            },
          });
        }}
        id={props.id}
        name={props.id}
        value={props.value}
        max={
          props.max ||
          utils().formatDate(utils().getToday(), {
            format: "yyyy-mm-dd",
          })
        }
        min={props.min}
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
        maxDate={props.max ? getDateObject(props.max) : utils().getToday()}
        minDate={props.min ? getDateObject(props.min) : undefined}
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
