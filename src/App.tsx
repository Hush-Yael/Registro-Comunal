import "./App.css";
import { Route, Router, RouteSectionProps } from "@solidjs/router";
import Header from "./components/header";
import Aside from "./components/aside";
import { useTheme } from "./hooks/useTheme";
import Settings from "./pages/settings";
import About from "./pages/about";
import Home from "./pages/home";
import NotFound from "./pages/not-found";

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
      <Route path="/" component={Home} />
      <Route path="/configuracion" component={Settings} />
      <Route path="/acerca-de" component={About} />
      <Route path="*" component={NotFound} />
    </Router>
  );
}

export default App;
