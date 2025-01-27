import "./App.css";
import { Router, RouteSectionProps } from "@solidjs/router";

function App() {
  const layout = (props: RouteSectionProps) => <>{props.children}</>;

  return <Router root={layout}></Router>;
}

export default App;
