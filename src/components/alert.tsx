import { Match, Show, Switch } from "solid-js";
import { JSX } from "solid-js";
import { Check } from "../icons";

type AlertProps = {
  class?: string;
  variant: "success" | "alert" | "info" | "error";
  title?: JSX.Element;
  children: JSX.Element;
};

const Alert = (props: AlertProps) => {
  const variants = {
    alert: `
      bg-[hsl(49_65%_80%)]
      text-[hsl(49_98%_20%)]
    `,
    success: `
      bg-[hsl(135_65%_80%)]
      text-[hsl(135_98%_20%)]
    `,
  };

  return (
    <p
      role="alert"
      class={`grid grid-cols-[auto_1fr] gap-3 p-3 rounded-lg ${
        variants[props.variant as keyof typeof variants]
      } ${props.class || ""}`}
    >
      <span class="*:inline">
        <Switch>
          <Match when={props.variant === "success"}>
            <Check />
          </Match>
          <Match when={props.variant === "alert"}>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <g>
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M12.866 3l9.526 16.5a1 1 0 0 1-.866 1.5H2.474a1 1 0 0 1-.866-1.5L11.134 3a1 1 0 0 1 1.732 0zM11 16v2h2v-2h-2zm0-7v5h2V9h-2z" />
              </g>
            </svg>
          </Match>
        </Switch>
      </span>
      <span class="content">
        <Show when={props.title}>
          <span class="title db fw500">{props.title}</span>
        </Show>
        <span class="description">{props.children}</span>
      </span>
    </p>
  );
};

export default Alert;
