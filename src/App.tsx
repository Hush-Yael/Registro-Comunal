import "./App.css";
import { Route, Router, RouteSectionProps } from "@solidjs/router";
import Header from "./components/header";
import Aside from "./components/aside";
import { useTheme } from "./hooks/useTheme";
import Settings from "./pages/settings";

export const { theme, setTheme } = useTheme();

function App() {
  const layout = (props: RouteSectionProps) => (
    <>
      <Header />
      <Aside />
      {props.children}
    </>
  );

  return (
    <Router root={layout}>
      <Route path="/configuracion" component={Settings} />
    </Router>
  );
}

export default App;
