import { createResource } from "solid-js";
import Tabs from "./tabs";
import { getRecords } from "../../lib/db";

const Records = () => {
  const [records] = createResource(async () => await getRecords());

  return (
    <main class="p-2 px-3">
      <Tabs records={records()} />
    </main>
  );
};

export default Records;
