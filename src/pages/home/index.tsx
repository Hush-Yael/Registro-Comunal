import { useMedia } from "../../hooks/useMedia";
import DB from "./components/db";
import Info from "./components/info";

export const breakpoint = useMedia(
  "(min-width: 1024px) and (max-width: 1199px)"
);

const Home = () => {
  return (
    <main class="flex flex-col flex-1 gap-8 p-3 md:p-5 min-[1200px]:grid min-[1200px]:grid-cols-2">
      <DB />
      <Info />
    </main>
  );
};
export default Home;
