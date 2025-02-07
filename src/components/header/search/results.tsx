import { For, Show } from "solid-js";

const Results = (props: { results: any[] }) => {
  return (
    <ul>
      <Show when={!props.results.length}>
        <li class="p-3 fore text-lg text-center">
          No se encontraron resultados
        </li>
      </Show>
      <Show when={props.results.length}></Show>
    </ul>
  );
};
export default Results;
