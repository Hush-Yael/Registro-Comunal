import { For } from "solid-js";
import Developer from "../components/developer";
import Hr from "../../../components/hr";

const collaborators = [
  "Amaris Arellano",
  "José Ramírez",
  "Nelson Martínez",
  "Yorman Martínez",
  "Yorsen Dugarte",
];

const Personal = () => {
  return (
    <article class="flex flex-col gap-5 py-5">
      <Developer
        role="main"
        name="Jean Sandoval"
        imgSrc="/developers/main.jpg"
      />
      <Hr />
      <div class="flex flex-col gap-2">
        <ul class="flex flex-col gap-5">
          <For each={collaborators}>
            {(name) => <Developer role="secondary" name={name} />}
          </For>
        </ul>
      </div>
    </article>
  );
};
export default Personal;
