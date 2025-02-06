import "./App.css";
import { Route, Router, RouteSectionProps } from "@solidjs/router";
import Header from "./components/header";
import Aside from "./components/aside";
import { useTheme } from "./hooks/useTheme";
import About from "./pages/about";
import Home from "./pages/home";
import Register from "./pages/form";
import NotFound from "./pages/not-found";
import { Toaster } from "solid-toast";
import Records from "./pages/records";
import Record from "./pages/record";

export const { theme, setTheme } = useTheme();

function App() {
  const layout = (props: RouteSectionProps) => (
    <>
      <Header />
      <Aside />
      {props.children}
      <Toaster />
    </>
  );

  return (
    <Router root={layout}>
      <Route path="/" component={Home} />
      <Route path="/registro" component={Register} />
      <Route path="/registros" component={Records} />
      <Route path="/jefe/:cedula" component={Record} />
      <Route path="/acerca-de" component={About} />
      <Route path="*" component={NotFound} />
    </Router>
  );
}

export default App;
