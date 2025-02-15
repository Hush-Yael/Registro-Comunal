import { Row } from "../../../components/table";
import { A } from "@solidjs/router";
import { cedula as Cedula } from "../../../lib/data";
import { Table } from "../components/table";
import { DBComunalRecord } from "../../../types/db";
import { Photo } from "../../record/components/cedula";
import Age from "../../../components/edad";
import { parseWithSex } from "../../../lib/utils";
import Email from "../../../components/email";
import Tel from "../../../components/tel";

const Jefes = (props: { records: DBComunalRecord<"jefe">[] }) => (
  <Table<"jefe">
    records={props.records}
    filters={[
      { label: "cédula", value: "cedula" },
      "nombres",
      "apellidos",
      "sexo",
      { label: "fecha de nacimiento", value: "fechaNacimiento" },
      { label: "teléfono", value: "tel" },
      { label: "correo", value: "email" },
      { label: "nivel de estudios", value: "nivelEstudios" },
      { label: "estado civil", value: "edoCivil" },
    ]}
    columns={[
      { text: "Cédula", align: "r" },
      "Nombres y Apellidos",
      "Sexo",
      { text: "Fecha de Nacimiento", align: "r" },
      { text: "Teléfono", align: "r" },
      "Correo",
      "Nivel de estudios",
      "Estado civil",
    ]}
  >
    {(
      {
        cedula,
        nombres,
        apellidos,
        sexo,
        fechaNacimiento,
        tel,
        email,
        nivelEstudios,
        edoCivil,
        venezolano,
      },
      i
    ) => (
      <Row>
        <td class="text-right">{i() + 1}</td>
        <td class="text-right min-w-max">
          <A class="link" href={`/jefe/${cedula}`}>
            {Cedula(cedula, venezolano)}
          </A>
        </td>
        <td class="min-w-max">
          {nombres} {apellidos}
        </td>
        <td>
          <Photo class="m-auto" sexo={sexo} noText />
        </td>
        <td class="text-right">
          <Age date={fechaNacimiento} />
        </td>
        <td class="text-right">
          <Tel data={tel} />
        </td>
        <td>
          <Email data={email} />
        </td>
        <td>{nivelEstudios}</td>
        <td>{parseWithSex(sexo, edoCivil)}</td>
      </Row>
    )}
  </Table>
);
export default Jefes;
