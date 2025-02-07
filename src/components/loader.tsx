import "./styles/loader.css";
import { Show } from "solid-js";

const Loader = (props: { active: boolean; s?: number; dt?: number }) => {
  return (
    <Show when={props.active}>
      <div
        class="loader"
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
    </Show>
  );
};
export default Loader;
