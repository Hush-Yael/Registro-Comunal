import { For } from "solid-js";
import Developer from "../components/developer";
import { Email, Tel } from "../../../icons";
import Hr from "../../../components/layout/hr";

const collaborators = [
  "Amaris Arellano",
  "Andrey Yen",
  "José Ramírez",
  "Nelson Martínez",
  "Yorman Martínez",
  "Yorsen Dugarte",
];

const Personal = () => {
  return (
    <section class="flex flex-col gap-5 m-auto max-w-[1000px] py-5">
      <div class="flex flex-col gap-3.5">
        <Developer
          role="main"
          name="Jean Sandoval"
          imgSrc="/developers/main.jpg"
        />
        <div class="col-span-2 px-2 text-center text-balance">
          <p>Para soporte o sugerencias, contactar a: </p>
          <div class="flex flex-wrap justify-center gap-2 py-1 link">
            <a class="flex items-center gap-1" href="mailto:srjean21@gmail.com">
              <Email /> srjean21@gmail.com
            </a>
            <a class="flex items-center gap-0.5" href="tel:+584127734204">
              <Tel /> 0412-7734204
            </a>
          </div>
        </div>
      </div>
      <Hr />
      <div class="flex flex-col gap-4">
        <p class="text-center fore">Colaboradores en el proyecto</p>
        <ul class="flex flex-wrap justify-center gap-6 ">
          <For each={collaborators}>
            {(name) => (
              <li>
                <Developer role="secondary" name={name} />
              </li>
            )}
          </For>
        </ul>
      </div>
    </section>
  );
};
export default Personal;
