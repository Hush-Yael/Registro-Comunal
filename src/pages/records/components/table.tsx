import { Show, For, createSignal } from "solid-js";
import { NoFile } from "../../../icons";
import { Row, Table as TABLE, Thead } from "../../../components/layout/table";
import { TableRecord } from "../../../types/db";
import { parseStringDiacrits } from "../../../lib/utils";
import Select from "../../../components/form/select";
import Search from "../../../components/form/search";
import { RecordKey } from "../../../types/form";
import {
  ExternalFilter,
  TableProps,
  NamedFilter,
  sCol,
} from "../../../types/table";
import { useLocalStorage } from "../../../hooks/useLocalStorage";

type ThAlign = "l" | "r" | "c" | undefined;

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

export const [externalFilter, setExternalFilter] = createSignal<
  ExternalFilter<RecordKey> | undefined
>();

export const Table = <K extends RecordKey>(props: TableProps<K>) => {
  const filters = props.filters.map((f) =>
    typeof f === "string" ? { label: f, value: f } : f
  ) as NamedFilter<K>[];

  const [searchVal, setSearchVal] = createSignal("");

  const [lcFilterName, setLcFilterName] = useLocalStorage(
    `${props.tableName}-filter`,
    filters[0].value
  );
  const [filter, setFilter] = createSignal<NamedFilter<K>>(
    (props.filters.find((f) =>
      (f as NamedFilter<K>).value
        ? (f as NamedFilter<K>).value === lcFilterName()
        : f === lcFilterName()
    ) || filters[0]) as NamedFilter<K>
  );

  const filtered = () => {
    const _filter = filter(),
      _externalFilter = externalFilter();
    if (!searchVal() || (!_filter && !_externalFilter)) return props.records;

    return props.records.filter((r) => {
      if (!_filter) return true;

      const path = r[(_filter as NamedFilter<K>).value as keyof TableRecord<K>];

      if (!path) return false;

      if (
        parseStringDiacrits(
          typeof path !== "string" ? path.toString() : path
        ).includes(searchVal())
      ) {
        if (_externalFilter)
          return (
            r[_externalFilter!.path as unknown as keyof TableRecord<K>] ===
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
      <Show
        when={props.records.length}
        fallback={
          <article class="flex items-center justify-center gap-2 !p-4 gray-container-100 w-[90vw] max-w-[500px]">
            <NoFile class="text-red-700 dark:text-red-400 !h-[1.375em]" />
            <h2 role="alert" class=" text-xl">
              No hay registros
            </h2>
          </article>
        }
      >
        <header class="sticky left-0 z-1 w-full grid grid-cols-[1fr_auto] gap-2 *:min-h-full">
          <Search
            type={
              filter() && (filter() as NamedFilter<K>).number
                ? "number"
                : "text"
            }
            id="filter-table"
            class="input-solid"
            inputClass="outline-0"
            disabled={!filter()}
            onChange={setSearchVal}
            debounce={500}
            placeholder="Filtrar..."
            onlyLetters={(filter() as NamedFilter<K>).lettersOnly}
            onlyDashNumbers={(filter() as NamedFilter<K>).dashNumbers}
          />
          <Select
            inputClass="h-full flex-row-reverse gap-2 !pr-3"
            contentClass="z-2"
            options={filters}
            onChange={(v) => {
              setSearchVal("");
              setLcFilterName(v.value || v);
              setFilter(v);
            }}
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
        <div class="max-w-full overflow-auto">
          <TABLE class="!rounded-lg m-auto">
            <Thead class={props.theadClass}>
              <th class="!text-right">#</th>
              <For each={props.columns}>
                {(column) => (
                  <th class={getTextAlign((column as sCol<K>).align)}>
                    {typeof column === "string" ? column : column.text}
                  </th>
                )}
              </For>
            </Thead>
            <tbody
              class={`tabular-nums **:min-w-max ${props.tbodyClass || ""}`}
            >
              <Show
                when={filtered().length}
                fallback={
                  <tr>
                    <td class="pt-2" colSpan={props.columns.length + 1}>
                      <p role="alert" class="!text-center">
                        No hay resultados para la búsqueda
                        {searchVal() && (
                          <>
                            : «<span class="font-bold">{searchVal()}</span>»
                          </>
                        )}
                      </p>
                    </td>
                  </tr>
                }
              >
                <For each={filtered()}>
                  {(record, i) => (
                    <Row>
                      <td class="text-right">{i() + 1}</td>
                      {props.children(record)}
                    </Row>
                  )}
                </For>
              </Show>
            </tbody>
          </TABLE>
        </div>
      </Show>
    </div>
  );
};
