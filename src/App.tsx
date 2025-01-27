import "./App.css";
import { Router, RouteSectionProps } from "@solidjs/router";
import { useTheme } from "./hooks/useTheme";

export const { theme, setTheme } = useTheme();

function App() {
  const layout = (props: RouteSectionProps) => <>{props.children}</>;

  return <Router root={layout}></Router>;
}

export default App;
