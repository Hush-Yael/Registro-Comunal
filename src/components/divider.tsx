type HrProps = {
  variant?: string;
};

const Hr = (props: HrProps) => (
  <hr
    class={`div-border ${
      props.variant === "horizontal" ? "border-r-1 h-4" : ""
    }`}
  />
);

export default Hr;
