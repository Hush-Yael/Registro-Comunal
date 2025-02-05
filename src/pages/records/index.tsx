import { createSignal, onMount } from "solid-js";
import Tabs from "./tabs";
import { getRecords } from "../../lib/db";
import { FormData } from "../form";

const Records = () => {
  const [records, setRecords] = createSignal<FormData[]>([]);

  onMount(async () => {
    const records = await getRecords();
    setRecords(records);
  });

  return (
    <main class="p-2 px-3">
      <Tabs records={records()} />
    </main>
  );
};

export default Records;
