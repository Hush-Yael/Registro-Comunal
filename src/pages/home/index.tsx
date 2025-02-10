import DB from "./components/db";
import Info from "./components/info";

const Home = () => {
  return (
    <main class="flex flex-col flex-1 gap-8 p-3 md:p-5">
      <Info />
      <DB />
    </main>
  );
};
export default Home;
