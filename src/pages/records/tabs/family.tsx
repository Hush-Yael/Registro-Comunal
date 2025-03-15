import { A } from "@solidjs/router";
import { commonFilters } from "..";
import { cedula as Cedula } from "../../../lib/data";
import Age from "../../../components/data/edad";
import { TableRecords } from "../../../types/db";
import { Table } from "../components/table";
import Bars from "../../../components/charts/bars";
import { plural } from "../../../lib/utils";
import { JefeChart } from "../components/jefe-chart";

const Family = (props: { data: TableRecords["family"] }) => (
  <div
    class={`flex flex-col max-w-max m-auto *:mx-auto overflow-auto ${
      props.data.records.length > 0 ? "gap-5" : "pt-2"
    } grid-cols-[1fr_300px] `}
  >
    <div class="flex gap-2 w-full max-w-max *:min-w-[270px] overflow-auto col-[2/3] row-[1/2] *:justify-between">
      <Bars
        class="!min-w-[400px]"
        h={150}
        w={300}
        indexAxis="y"
        title="Rango de edades"
        data={Object.values(props.data.charts.edades.range)}
        labels={Object.keys(props.data.charts.edades.range)}
      >
        <ul class="mr-auto list-inside list-disc">
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
        title="Fallecidos"
        path="fallecido"
        colors={["hsl(0, 0%, 48.21%)", "hsl(175.89, 100%, 37.69%)"]}
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
    </div>
    <Table
      tableName="family"
      class="m-auto p-2"
      records={props.data.records}
      filters={[
        ...commonFilters,
        "parentesco",
        { label: "edad", value: "edad", number: true },
        { label: "cédula del jefe", value: "jefeCedula", number: true },
        { label: "nombres del jefe", value: "jefeNombres", lettersOnly: true },
        {
          label: "apellidos del jefe",
          value: "jefeApellidos",
          lettersOnly: true,
        },
      ]}
      columns={[
        { text: "Cédula", align: "r" },
        "Nombres y Apellidos",
        { text: "Fecha de Nacimiento", align: "r" },
        "parentesco",
        { text: "Jefe de hogar" },
        { text: "Cédula del Jefe" },
      ]}
    >
      {({
        cedula,
        nombres,
        apellidos,
        fechaNacimiento,
        edad,
        fechaDeceso,
        fallecido,
        venezolano,
        parentesco,
        jefeCedula,
        jefeNombres,
        jefeApellidos,
      }) => (
        <>
          <td class="text-right whitespace-nowrap">
            {Cedula(cedula, venezolano)}
          </td>
          <td>
            {nombres} {apellidos}
          </td>
          <td class="text-right">
            <Age
              class="justify-end"
              fechaNacimiento={fechaNacimiento}
              fallecido={fallecido}
              edad={edad}
              fechaDeceso={fechaDeceso}
            />
          </td>
          <td>{parentesco}</td>
          <td>
            {jefeNombres} {jefeApellidos}
          </td>
          <td class="text-right whitespace-nowrap">
            <A class="link" href={`/jefe/${jefeCedula}`}>
              {Cedula(jefeCedula, venezolano)}
            </A>
          </td>
        </>
      )}
    </Table>
  </div>
);

export default Family;
