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
    columns={
      <>
        <th class="!text-right">#</th>
        <th class="!text-right">Cédula</th>
        <th>Nombres y Apellidos</th>
        <th>Sexo</th>
        <th class="!text-right">Fecha de Nacimiento</th>
        <th class="!text-right">Teléfono</th>
        <th>Correo</th>
        <th>Nivel de estudios</th>
        <th>Estado civil</th>
      </>
    }
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
