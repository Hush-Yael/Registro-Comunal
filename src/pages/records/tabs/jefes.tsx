import { Row } from "../../../components/table";
import { A } from "@solidjs/router";
import { cedula as Cedula } from "../../../lib/data";
import { DBComunalRecords } from "../../../types/db";
import Age from "../../../components/edad";
import HoverData from "../components/hover-data";
import { JefeChart } from "../components/jefe-chart";
import { Table } from "../components/table";
import Tel from "../../../components/data/tel";
import Email from "../../../components/data/email";

const Jefes = (props: { data: DBComunalRecords["jefe"] }) => (
  <div class="flex flex-col gap-5 max-w-max m-auto *:mx-auto overflow-auto min-[1200px]:grid grid-cols-[1fr_auto] ">
    <div class="flex gap-5 w-full max-w-max *:min-w-[270px] p-2 overflow-auto col-[2/3] row-[1/2] min-[1200px]:flex-col">
      <JefeChart
        type="pie"
        title="Sexo"
        path="sexo"
        colors={["hsl(328.25, 91.83%, 58.21%)", "hsl(195.89, 100%, 37.69%)"]}
        charts={props.data.charts}
      />
      <JefeChart
        type="pie"
        title="Nacionalidad"
        path="venezolano"
        colors={["hsl(0, 0%, 48.21%)", "hsl(175.89, 100%, 37.69%)"]}
        charts={props.data.charts}
      />
      <JefeChart
        type="doughnut"
        title="Nivel de estudios"
        class="w-[350px]"
        charts={props.data.charts}
        path="nivelEstudios"
      />
      <JefeChart
        type="doughnut"
        title="Estado civil"
        path="edoCivil"
        class="//h-[300px] w-[350px]"
        charts={props.data.charts}
      />
    </div>
    <Table<"jefe">
      records={props.data.records}
      filters={[
        { label: "cédula", value: "cedula", number: true },
        "nombres",
        "apellidos",
        "sexo",
        { label: "edad", value: "edad", number: true },
        { label: "fecha de nacimiento", value: "fechaNacimiento" },
        { label: "teléfono", value: "tel", number: true },
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
  </div>
);
export default Jefes;
