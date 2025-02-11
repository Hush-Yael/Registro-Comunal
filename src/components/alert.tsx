import { Match, Show, Switch } from "solid-js";
import { JSX } from "solid-js";
import { Check, Alert as AlertIcon, Info } from "../icons";

type AlertProps = {
  class?: string;
  variant: "success" | "alert" | "warning" | "info" | "error";
  title?: JSX.Element;
  children: JSX.Element;
};

const Alert = (props: AlertProps) => {
  const variants = {
    alert: `
      bg-[hsl(49_65%_80%)]
      text-[hsl(49_98%_20%)]
    `,
    warning: `
      border border-[hsl(0_50%_50%)]
      text-[hsl(0_80%_50%)]
      dark:border-[hsl(0_100%_60%)]
      dark:text-[hsl(0_100%_85%)]
    `,
    info: `
      bg-[hsl(180_65%_80%)]
      text-[hsl(180_98%_20%)]
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
          <Match when={props.variant === "info"}>
            <Info />
          </Match>
          <Match when={props.variant === "alert"}>
            <AlertIcon />
          </Match>
          <Match when={props.variant === "warning"}>
            <AlertIcon />
          </Match>
        </Switch>
      </span>
      <span class="content">
        <Show when={props.title}>
          <span class="block font-[500]">{props.title}</span>
        </Show>
        <span class="description">{props.children}</span>
      </span>
    </p>
  );
};

export default Alert;
