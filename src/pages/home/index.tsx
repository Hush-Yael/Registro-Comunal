import DescLink from "../../components/desc-link";
import { Paper } from "../../icons/home";

const Home = () => {
  return (
    <main class="flex flex-col flex-1 gap-2 p-3 md:p-5">
      <div class="flex flex-col gap-2">
        <figure class="w-fit">
          <figcaption class="fore">
            <i>Croquis del sector</i>
          </figcaption>
          <img
            src="/croquis.png"
            alt="imagen del croquis del sector"
            class="max-h-[500px] rounded-xl bg-white"
          />
        </figure>
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
      </div>
    </main>
  );
};
export default Home;
