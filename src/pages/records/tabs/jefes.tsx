import { Row } from "../../../components/table";
import { A } from "@solidjs/router";
import { cedula as Cedula } from "../../../lib/data";
import { Table } from "../components/table";
import { DBComunalRecord } from "../../../types/db";
import Age from "../../../components/edad";
import Tel from "../../../components/tel";
import HoverData from "../components/hover-data";
import Email from "../../../components/email";

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
    theadClass="whitespace-nowrap"
    columns={[
      { text: "Cédula", align: "r" },
      "Nombres y Apellidos",
      { text: "Fecha de Nacimiento", align: "r" },
      { text: "Teléfono", align: "r" },
      "Correo",
    ]}
  >
    {(
      {
        cedula,
        nombres,
        apellidos,
        fechaNacimiento,
        edad,
        tel,
        email,
        venezolano,
      },
      i
    ) => (
      <Row>
        <td class="text-right">{i() + 1}</td>
        <td class="text-right whitespace-nowrap">
          <A class="link" href={`/jefe/${cedula}`}>
            {Cedula(cedula, venezolano)}
          </A>
        </td>
        <td>
          {nombres} {apellidos}
        </td>
        <td class="text-right">
          <Age age={edad} date={fechaNacimiento} />
        </td>
        <td class="text-center">
          {tel && (
            <HoverData>
              <Tel data={tel} />
            </HoverData>
          )}
        </td>
        <td class="text-center">
          {email && (
            <HoverData>
              <Email data={email} />
            </HoverData>
          )}
        </td>
      </Row>
    )}
  </Table>
);
export default Jefes;
