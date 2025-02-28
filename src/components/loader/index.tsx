import "./index.css";
import { JSX, Show } from "solid-js";

const Loader = (props: {
  class?: string;
  active: boolean;
  s?: number;
  dt?: number;
  wrapperClass?: string;
  children?: JSX.Element;
}) => {
  return (
    <Show when={props.active}>
      <div class={`flex flex-col gap-2 w-fit h-fit ${props.wrapperClass}`}>
        <div
          class={`loader ${props.class || ""}`}
          style={{
            "--s": `${props.s || 30}px`,
            "--dot-s": `calc(var(--s) * ${props.dt || 0.17})`,
          }}
          role="status"
          aria-label="cargando"
        >
          <div class="dot" />
          <div class="dot" />
          <div class="dot" />
          <div class="dot" />
          <div class="dot" />
          <div class="dot" />
        </div>
        {props.children}
      </div>
    </Show>
  );
};
export default Loader;
