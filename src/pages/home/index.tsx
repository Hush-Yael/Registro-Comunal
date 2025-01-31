import DescLink from "../../components/desc-link";
import { Book, Paper } from "../../icons/home";

const Home = () => {
  return (
    <main class="flex flex-col flex-1 gap-5 p-3 md:p-5">
      <ul class="flex flex-col gap-2 min-[550px]:flex-row">
        <DescLink
          href="/guia-de-uso"
          linkChildren={
            <>
              <span class="flex items-center gap-2">
                <Book />
                Ver guía de uso
              </span>
            </>
          }
        >
          <p class="text-sm fore">
            Conoce las funciones y cómo hacer uso correcto de esta aplicación.
          </p>
        </DescLink>
        <DescLink
          href="/referencia-historica"
          linkChildren={
            <>
              <span class="flex items-center gap-2">
                <Paper />
                Ver referencia histórica
              </span>
            </>
          }
        >
          <p class="text-sm fore">
            Ver información acerca de la historia del sector y sus habitantes.
          </p>
        </DescLink>
      </ul>
      <figure class="w-fit">
        <img
          src="/croquis.png"
          alt="imagen del croquis del sector"
          class="max-h-[500px] rounded-xl bg-white"
        />
        <figcaption class="text-right fore">
          <i>Croquis del sector</i>
        </figcaption>
      </figure>
    </main>
  );
};
export default Home;
