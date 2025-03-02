import { A } from "@solidjs/router";
import { cedula as Cedula } from "../../../lib/data";
import { DBComunalRecords } from "../../../types/db";
import { JefeChart } from "../components/jefe-chart";
import { Table } from "../components/table";
import Tel from "../../../components/data/tel";
import Email from "../../../components/data/email";
import { Show } from "solid-js";
import Dash from "../../../components/dash";
import { plural } from "../../../lib/utils";
import { commonFilters } from "..";
import HoverData from "../../../components/hover-data";
import { Eye } from "../../../icons";
import Bars from "../../../components/charts/bars";

const r = "hsl(328.25, 91.83%, 58.21%)",
  b = "hsl(195.89, 100%, 37.69%)";

const Jefes = (props: { data: DBComunalRecords["jefe"] }) => (
  <div class="flex flex-col gap-5 max-w-max m-auto *:mx-auto overflow-auto min-[1200px]:grid grid-cols-[1fr_300px] min-[1200px]:p-2">
    <div class="flex gap-2 w-full max-w-max *:min-w-[270px] overflow-auto col-[2/3] row-[1/2] min-[1200px]:flex-col min-[1200px]:*:w-[unset] *:justify-between">
      <Bars
        h={100}
        w={200}
        max={props.data.records.length}
        title="Rango de edades"
        data={Object.values(props.data.charts.edades.range)}
        labels={Object.keys(props.data.charts.edades.range)}
      >
        <ul class="list-inside list-disc">
          <li>
            El menor tiene <b>{props.data.charts.edades.menor}</b>{" "}
            {plural("año", props.data.charts.edades.menor)}
          </li>
          <li>
            El mayor tiene <b>{props.data.charts.edades.mayor}</b>{" "}
            {plural("año", props.data.charts.edades.mayor)}
          </li>
          <li>
            <b>{props.data.charts.edades.promedio}</b>{" "}
            {plural("año", props.data.charts.edades.promedio)} de edad en
            promedio
          </li>
        </ul>
      </Bars>
      <JefeChart
        type="pie"
        size={140}
        title="Sexo"
        path="sexo"
        colors={
          props.data.records.length > 1
            ? [r, b]
            : [
                props.data.records[0].sexo === "M" ? b : r,
                props.data.records[0].sexo === "M" ? r : b,
              ]
        }
        charts={props.data.charts}
      />
      <JefeChart
        type="pie"
        size={140}
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
        ...commonFilters,
        { label: "edad", value: "edad", number: true },
        { label: "teléfono", value: "tel", dashNumbers: true },
        { label: "correo", value: "email" },
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
      {({
        cedula,
        nombres,
        apellidos,
        fechaNacimiento,
        edad,
        tel,
        email,
        venezolano,
      }) => (
        <>
          <td class="text-right whitespace-nowrap">
            <A class="link" href={`/jefe/${cedula}`}>
              {Cedula(cedula, venezolano)}
            </A>
          </td>
          <td>
            {nombres} {apellidos}
          </td>
          <td class="text-right">
            <Show
              when={fechaNacimiento}
              fallback={<i class="fore">Desconocida</i>}
            >
              <span class="flex gap-1">
                {fechaNacimiento}
                <Dash />
                {edad} {plural("año", edad!)}
              </span>
            </Show>
          </td>
          <td class="text-center">
            {tel && (
              <HoverData icon={<Eye />}>
                <Tel data={tel} />
              </HoverData>
            )}
          </td>
          <td class="text-center">
            {email && (
              <HoverData icon={<Eye />}>
                <Email data={email} />
              </HoverData>
            )}
          </td>
        </>
      )}
    </Table>
  </div>
);
export default Jefes;
