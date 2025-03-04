type HrProps = {
  class?: string;
  variant?: string;
};

const Hr = (props: HrProps) => (
  <hr
    class={`div-border ${
      props.variant === "horizontal" ? "border-r-1 h-4" : ""
    } ${props.class || ""}`}
  />
);

export default Hr;
