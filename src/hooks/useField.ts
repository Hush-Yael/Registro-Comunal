import { DeepKeys, FieldApi } from "@tanstack/solid-form";
import { SelectOption } from "../components/select";
import { ComunalRecord } from "../types/form";

export const useField = <P extends DeepKeys<ComunalRecord>>(
  field: () => FieldApi<ComunalRecord, P, any, any, any>,
  select = false,
  name = false
) => {
  const value = field().state.value;
  const errors = field().state.meta.errors;

  const onChange = (value: unknown) => {
    field().handleChange(!select ? value : (value as SelectOption).value);
  };

  return {
    ...(!name ? { id: field().name } : { name: field().name }),
    value: !select ? value : { value: value === null ? "" : value },
    onChange,
    onBlur: field().handleBlur,
    error: errors ? errors[0] : null,
  };
};
