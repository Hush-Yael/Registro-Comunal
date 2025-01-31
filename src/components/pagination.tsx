import {
  Pagination as Pag,
  PaginationRootProps,
} from "@kobalte/core/pagination";
import { CaretL, CaretR } from "../icons";

type Props = Omit<
  PaginationRootProps,
  "itemComponent" | "ellipsisComponent"
> & {
  class?: string;
  btnsLabel?: boolean;
};

const itemClass = "h-full p-1 border-neutral-300 dark:border-neutral-600";

const Pagination = (props: Props) => {
  return (
    <Pag
      {...props}
      // estilos del ul
      class={`m-auto *:flex ${props.class || ""}`}
      count={props.count}
      itemComponent={(props) => (
        <Pag.Item
          class={`${itemClass} px-3.5 border-y-1 aria-[current=page]:border-neutral-900 dark:aria-[current=page]:border-white aria-[current=page]:bg-neutral-900 dark:aria-[current=page]:bg-white aria-[current=page]:text-white aria-[current=page]:dark:text-neutral-900`}
          page={props.page}
        >
          {props.page}
        </Pag.Item>
      )}
      ellipsisComponent={() => (
        <Pag.Ellipsis class={`${itemClass} border-y-1`}>...</Pag.Ellipsis>
      )}
    >
      <Pag.Previous
        class={`${itemClass} flex items-center gap-1 px-2 border rounded-tl-lg rounded-bl-lg fore`}
      >
        <CaretL />
        {props.btnsLabel && "Anterior"}
      </Pag.Previous>
      <Pag.Items />
      <Pag.Next
        class={`${itemClass} flex items-center gap-1 px-2 border rounded-tr-lg rounded-br-lg fore`}
      >
        {props.btnsLabel && "Siguiente"}
        <CaretR />{" "}
      </Pag.Next>
    </Pag>
  );
};
export default Pagination;
