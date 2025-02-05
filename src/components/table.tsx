import { JSX } from "solid-js";

type Props = {
  children: JSX.Element;
};

export const Table = (props: Props) => (
  <table class="min-w-max px-1.5 border border-spacing-0 border-separate border-tools-table-outline gray-container-100">
    {props.children}
  </table>
);

export const Thead = (props: Props) => (
  <thead>
    <tr class="*:border-b-1 *:border-neutral-200 dark:*:border-neutral-700 *:p-1 *:px-3 *:text-left">
      {props.children}
    </tr>
  </thead>
);

export const Row = (props: Props) => (
  <tr class="*:p-2 *:px-3 *:border-b-1 *:border-neutral-200 dark:*:border-neutral-700 last:*:border-0">
    {props.children}
  </tr>
);
