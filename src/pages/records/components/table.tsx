import { Show, For, JSX, Accessor, children } from "solid-js";
import { NoFile } from "../../../icons";
import { ComunalRecord } from "../../../types/form";
import { Table as TABLE, Thead } from "../../../components/table";
import { DBComunalRecord } from "../../../types/db";

interface TableProps<Key extends keyof ComunalRecord> {
  records: DBComunalRecord<Key>[];
  columns: string[] | JSX.Element;
  tbodyClass?: string;
  children: (
    record: DBComunalRecord<Key>,
    index: Accessor<number>
  ) => JSX.Element;
}

export function Table<Key extends keyof ComunalRecord>(props: TableProps<Key>) {
  return (
    <TABLE>
      <Thead>
        {Array.isArray(props.columns) ? (
          <For each={props.columns}>{(column) => <th>{column}</th>}</For>
        ) : (
          props.columns
        )}
      </Thead>
      <tbody class={props.tbodyClass}>
        <Show when={!props.records.length}>
          <tr>
            <td
              class="pt-2"
              colSpan={
                Array.isArray(props.columns)
                  ? props.columns.length
                  : children(() => props.columns).toArray().length
              }
            >
              <span class="flex items-center justify-center gap-1.5">
                <NoFile class="text-red-700 dark:text-red-400" /> No hay
                registros
              </span>
            </td>
          </tr>
        </Show>
        <Show when={props.records.length}>
          <For each={props.records}>{props.children}</For>
        </Show>
      </tbody>
    </TABLE>
  );
}
