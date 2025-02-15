import { Show, For, JSX, Accessor, createSignal } from "solid-js";
import { NoFile } from "../../../icons";
import { ComunalRecord } from "../../../types/form";
import { Table as TABLE, Thead } from "../../../components/table";
import { DBComunalRecord } from "../../../types/db";
import { parseStringDiacrits } from "../../../lib/utils";
import Select from "../../../components/select";
import Search from "../../../components/search";

type ThAlign = "l" | "r" | "c" | undefined;
type sCol = {
  text: string;
  align?: ThAlign;
};

const getTextAlign = (align: ThAlign) => {
  switch (align) {
    case "l":
      return "!text-left";
    case "r":
      return "!text-right";
    case "c":
      return "!text-center";
    default:
      return "";
  }
};

interface TableProps<Key extends keyof ComunalRecord> {
  records: DBComunalRecord<Key>[];
  columns: (string | sCol)[];
  filters: (keyof DBComunalRecord<Key>)[];
  theadClass?: string;
  tbodyClass?: string;
  children: (
    record: DBComunalRecord<Key>,
    index: Accessor<number>
  ) => JSX.Element;
  onFilter?: ({ value, path }: { value: string; path: string }) => void;
}

export const Table = <Key extends keyof ComunalRecord>(
  props: TableProps<Key>
) => {
  const [searchVal, setSearchVal] = createSignal("");
  const [filter, setFilter] = createSignal<keyof DBComunalRecord<Key> | "">(
    props.filters[0] || ""
  );

  const filtered = () =>
    props.records.filter((r) => {
      const path = r[filter() as keyof DBComunalRecord<Key>];
      if (!path) return true;

      return parseStringDiacrits(
        typeof path !== "string" ? path.toString() : path
      ).includes(searchVal());
    });

  return (
    <div class="flex flex-col gap-2 min-w-[min(95vw,600px)]">
      <Show when={props.records.length}>
        <header class="w-full flex items-end justify-between px-3">
          <Select
            label="Filtros de búsqueda"
            options={props.filters as unknown as string[]}
            onChange={setFilter}
            value={filter() as unknown as string[]}
          />
          <div class="input !p-0 outline-1 outline-[transparent] focus-within:!outline-[currentColor] transition-colors">
            <Search
              id="filter-table"
              class="outline-0"
              disabled={!filter()}
              onInput={setSearchVal}
              debounce={500}
              placeholder="Buscar"
            />
          </div>
        </header>
      </Show>
      <TABLE>
        <Thead class={props.theadClass}>
          <th class="!text-right">#</th>
          <For each={props.columns}>
            {(column) => {
              const text = typeof column === "string" ? column : column.text;

              return (
                <th class={getTextAlign((column as sCol).align)}>{text}</th>
              );
            }}
          </For>
        </Thead>
        <tbody class={`tabular-nums ${props.tbodyClass || ""}`}>
          <Show
            when={props.records.length}
            fallback={
              <tr>
                <td class="pt-2" colSpan={props.columns.length + 1}>
                  <span
                    role="alert"
                    class="flex items-center justify-center gap-1.5"
                  >
                    <NoFile class="text-red-700 dark:text-red-400" /> No hay
                    registros
                  </span>
                </td>
              </tr>
            }
          >
            <Show when={!filtered().length}>
              <tr>
                <td class="pt-2" colSpan={props.columns.length + 1}>
                  <p role="alert" class="!text-center">
                    No hay resultados para la búsqueda: «
                    <span class="font-bold">{searchVal()}</span>»
                  </p>
                </td>
              </tr>
            </Show>
            <For each={filtered()}>{props.children}</For>
          </Show>
        </tbody>
      </TABLE>
    </div>
  );
};
