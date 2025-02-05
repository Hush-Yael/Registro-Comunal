import { FieldApi } from "@tanstack/solid-form";
import { Option } from "../components/select";

export const useField = (
  field: () => FieldApi<any, any>,
  select = false,
  name = false
) => {
  const value = field().state.value;
  const errors = field().state.meta.errors;

  const onChange = (value: unknown) => {
    field().handleChange(!select ? value : (value as Option).value);
  };

  return {
    ...(!name ? { id: field().name } : { name: field().name }),
    value: !select ? value : { value: value || "" },
    onChange,
    onBlur: field().handleBlur,
    error: errors ? errors[0] : null,
  };
};
