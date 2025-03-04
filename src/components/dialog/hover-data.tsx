import { HoverCard } from "@kobalte/core/hover-card";
import { JSX } from "solid-js";

const HoverData = (props: { icon: JSX.Element; children: JSX.Element }) => {
  return (
    <HoverCard openDelay={400}>
      <HoverCard.Trigger class="flex justify-center !cursor-help **:!cursor-help">
        {props.icon}
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content class="dialog-content">
          {props.children}
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard>
  );
};
export default HoverData;
