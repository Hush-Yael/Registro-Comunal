import { Show, For, JSX, Accessor, createSignal } from "solid-js";
import { NoFile } from "../../../icons";
import { Table as TABLE, Thead } from "../../../components/table";
import { DBComunalRecord } from "../../../types/db";
import { parseStringDiacrits } from "../../../lib/utils";
import Select from "../../../components/select";
import Search from "../../../components/search";
import { RecordKey } from "../../../types/form";

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

type NamedFilter<K extends RecordKey> = {
  label: string;
  number?: boolean;
  value: keyof DBComunalRecord<K>;
};

type Filter<K extends RecordKey> = keyof DBComunalRecord<K> | NamedFilter<K>;
export type ExternalFilter<K extends RecordKey> =
  | undefined
  | { path: keyof DBComunalRecord<K>; value: DBComunalRecord<K> };

interface TableProps<K extends RecordKey> {
  records: DBComunalRecord<K>[];
  columns: (string | sCol)[];
  filters: Filter<K>[];
  class?: string;
  theadClass?: string;
  tbodyClass?: string;
  children: (
    record: DBComunalRecord<K>,
    index: Accessor<number>
  ) => JSX.Element;
  onFilter?: ({ value, path }: { value: string; path: string }) => void;
}

export const [externalFilter, setExternalFilter] =
  createSignal<ExternalFilter<RecordKey>>();

export const Table = <K extends RecordKey>(props: TableProps<K>) => {
  const filters = props.filters.map((f) =>
    typeof f === "string" ? { label: f, value: f } : f
  ) as NamedFilter<K>[];

  const [searchVal, setSearchVal] = createSignal("");
  const [filter, setFilter] = createSignal<NamedFilter<K> | "">(filters[0]);

  const filtered = () => {
    const _filter = filter(),
      _externalFilter = externalFilter();
    if (!_filter && !_externalFilter) return props.records;

    return props.records.filter((r) => {
      if (!_filter) return true;

      const path =
        r[(_filter as NamedFilter<K>).value as keyof DBComunalRecord<K>];

      if (!path) return false;

      if (
        parseStringDiacrits(
          typeof path !== "string" ? path.toString() : path
        ).includes(searchVal())
      ) {
        if (_externalFilter)
          return (
            r[_externalFilter!.path as unknown as keyof DBComunalRecord<K>] ===
            _externalFilter!.value
          );
        return true;
      }
    });
  };

  return (
    <div
      class={`flex flex-col gap-2 w-full max-w-max overflow-auto ${
        props.class || ""
      }`}
    >
      <Show when={props.records.length}>
        <header class="sticky left-0 z-1 w-full grid grid-cols-[1fr_auto] gap-2 *:min-h-full">
          <div class="input w-full !p-0 outline-1 outline-[transparent] focus-within:!outline-[currentColor] rounded-md transition-colors">
            <Search
              labelClass="!p-2"
              type={
                filter() && (filter() as NamedFilter<K>).number
                  ? "number"
                  : "text"
              }
              id="filter-table"
              class="w-full outline-0"
              disabled={!filter()}
              onInput={setSearchVal}
              debounce={500}
              placeholder="Buscar"
            />
          </div>
          <Select
            inputClass="h-full flex-row-reverse gap-2 !pr-3"
            contentClass="z-2"
            options={filters}
            onChange={setFilter}
            value={
              filter()
                ? {
                    label: (filter() as NamedFilter<K>).label,
                    value: (filter() as NamedFilter<K>).value || "",
                  }
                : { value: "", label: "" }
            }
            useObject
            notNull
            parseValueText={(value) => (
              <span class="font-[400]">
                Buscar por: <b>{value}</b>
              </span>
            )}
          />
        </header>
      </Show>
      <div class="max-w-full overflow-auto">
        <TABLE class="!rounded-lg m-auto">
          <Thead class={props.theadClass}>
            <th class="!text-right">#</th>
            <For each={props.columns}>
              {(column) => (
                <th class={getTextAlign((column as sCol).align)}>
                  {typeof column === "string" ? column : column.text}
                </th>
              )}
            </For>
          </Thead>
          <tbody class={`tabular-nums **:min-w-max ${props.tbodyClass || ""}`}>
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
    </div>
  );
};
