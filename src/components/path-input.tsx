import { createSignal, Match, Show, Switch } from "solid-js";
import Fields from "./fields";
import { errorText, InputProps } from "./input";
import RadioGroup from "./radio-group";
import Number from "./number";
import { HomePath } from "../pages/form";

type PathInputProps = Omit<InputProps, "onChange"> & {
  value: HomePath;
  onChange: (value: string) => void;
  pathType: string;
};

const getVal = (value: string) => value.split("-").map((v) => parseInt(v));

const PathInput = (props: PathInputProps) => {
  const [pathType, setPathType] = createSignal<"between" | "only">("only");

  return (
    <div>
      <Fields div wrapperClass="flex flex-col gap-1" legend={props.label}>
        <RadioGroup
          legend={null}
          name="pathType"
          value={pathType()}
          wrapperClass="!bg-neutral-200 dark:!bg-neutral-900"
          onChange={({ value }) => {
            setPathType(value as "between" | "only");
          }}
          items={[
            {
              value: "only",
              label: (
                <>
                  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <title />
                    <path d="M67,82a2.24,2.24,0,0,0,2.23-2.38L65.42,20.1A2.25,2.25,0,0,0,63.18,18H36.82a2.25,2.25,0,0,0-2.24,2.1l-3.8,59.52A2.24,2.24,0,0,0,33,82ZM48,22.58h4.1v7.9H48Zm0,15.79h4.1v7.9H48Zm0,15.8h4.1v7.91H48ZM48,70h4.1v7.9H48Z" />
                  </svg>
                  En la {props.pathType}...
                </>
              ),
            },
            {
              value: "between",
              label: (
                <>
                  <svg
                    fill="none"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 5L15 5L15 19H19V17H17L17 7L19 7V5Z"
                      fill="currentColor"
                    />
                    <path
                      d="M5 5L9 5L9 19H5L5 17H7L7 7H5L5 5Z"
                      fill="currentColor"
                    />
                    <path d="M13 7V17H11L11 7H13Z" fill="currentColor" />
                  </svg>
                  Entre {props.pathType}s
                </>
              ),
            },
          ]}
        />
        <Switch>
          <Match when={pathType() === "between"}>
            <div class="flex items-center gap-2">
              <Number
                value={getVal(props.value)[0]}
                onChange={(value) => {
                  const val = isNaN(value) ? "" : value;
                  const newVal = [val, getVal(props.value)[1]].join("-");

                  props.onChange(newVal);
                }}
                onBlur={props.onBlur}
                min={1}
                maxLength={1}
                class="w-full"
                type="number"
              />
              <span>y</span>
              <Number
                value={getVal(props.value)[1]}
                onChange={(value) => {
                  const val = isNaN(value) ? "" : value;
                  const newVal = [getVal(props.value)[0], val].join("-");

                  props.onChange(newVal);
                }}
                onBlur={props.onBlur}
                min={1}
                maxLength={1}
                class="w-full"
                type="number"
              />
            </div>
          </Match>
          <Match when={pathType() === "only"}>
            <Number
              type="number"
              value={getVal(props.value)[0]}
              min={1}
              maxLength={1}
              onChange={(value) =>
                props.onChange(isNaN(value) ? "" : String(value))
              }
              onBlur={props.onBlur}
            />
          </Match>
        </Switch>
        <Show when={props.error}>
          <p class={errorText}>{props.error}</p>
        </Show>
      </Fields>
    </div>
  );
};
export default PathInput;
