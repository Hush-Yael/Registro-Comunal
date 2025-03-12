import { useMedia } from "../../hooks/useMedia";
import DB from "./components/db";
import Info from "./components/info";

export const breakpoint = useMedia("(min-width: 1024px)");

const Home = () => {
  return (
    <main class="flex flex-col flex-1 gap-8 m-auto w-full p-3 md:p-5 max-w-[1100px]">
      <DB />
      <Info />
    </main>
  );
};
export default Home;
