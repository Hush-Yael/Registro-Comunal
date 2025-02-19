import { ComunalRecord } from "../../types/form";

type EmailProps = {
  data: ComunalRecord["jefe"]["email"];
};

const Email = (props: EmailProps) => {
  return (
    <>
      {props.data ? (
        <a class="link" href={`mailto:${props.data}`}>
          {props.data}
        </a>
      ) : (
        <i class="fore">Desconocido</i>
      )}
    </>
  );
};
export default Email;
