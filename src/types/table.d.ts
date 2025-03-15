import { JSX } from "solid-js";
import { TableRecord } from "./db";
import { ComunalRecord, RecordKey, RecordPath } from "./form";

export type NamedFilter<K extends RecordKey> = {
  label: string;
  number?: boolean;
  value: keyof TableRecord<K>;
  dashNumbers?: boolean;
  lettersOnly?: boolean;
};

type Filter<K extends RecordKey> = keyof TableRecord<K> | NamedFilter<K>;

export type ExternalFilter<K extends RecordKey> = {
  path: RecordPath<K>;
  value: TableRecord<K>;
};

export type sCol<K extends RecordKey> = {
  text: RecordPath<K> | string;
  align?: ThAlign;
};

interface TableProps<K extends RecordKey> {
  tableName: K;
  records: TableRecord<K>[];
  columns: (string | sCol)[];
  filters: Filter<K>[];
  class?: string;
  theadClass?: string;
  tbodyClass?: string;
  children: (record: TableRecord<K>) => JSX.Element;
  onFilter?: ({ value, path }: { value: string; path: string }) => void;
}
