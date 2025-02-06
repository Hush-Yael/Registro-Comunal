import { JSX } from "solid-js";
import SectionTitle from "../../../components/section-title";
import { getTotalGas } from "../../../lib/data";
import { ComunalRecord } from "../../../types/form";
import Answer from "../../../components/answer";
import Data from "./data";
import { Box, Gas, Id } from "../../../icons";

const Container = (props: {
    class?: string;
    label: JSX.Element;
    labelClass?: string;
    children: JSX.Element;
  }) => (
    <div class={props.class}>
      <span
        class={`flex items-center gap-2 font-[500] ${props.labelClass || ""}`}
      >
        {props.label}
      </span>
      {props.children}
    </div>
  ),
  svgClass = "!h-[1em]";

const Programs = (props: {
  data: {
    carnet: ComunalRecord["carnet"];
    clap: ComunalRecord["clap"];
    gas: ComunalRecord["gas"];
  };
}) => {
  return (
    <section>
      <SectionTitle>Programas sociales</SectionTitle>
      <article class="py-3">
        <div class="gray-container-100 flex flex-col *:p-1 divide-y divide-neutral-300 dark:divide-neutral-700">
          <Container
            class="flex justify-between"
            label={
              <>
                <Id class={svgClass} />
                ¿Posee Carnet de la patria?
              </>
            }
          >
            <Answer value={props.data.carnet.posee} />
          </Container>
          <Container
            class="flex flex-col gap-2 !py-3"
            label={
              <>
                <Box class={svgClass} />
                Bolsa o caja del clap
              </>
            }
          >
            <div class="flex justify-between text-center">
              <Data label="Posee">
                <Answer value={props.data.clap.posee} />
              </Data>
              <Data label="cantidad">
                {props.data.clap.posee ? (
                  props.data.clap.cantidad
                ) : (
                  <span class="fore">—</span>
                )}
              </Data>
            </div>
          </Container>
          <Container
            class="flex flex-col gap-2"
            label={
              <>
                <Gas class={svgClass} />
                Gas
              </>
            }
          >
            <div class="flex justify-between text-center">
              <Data label="Posee">
                <Answer value={props.data.gas.posee} />
              </Data>
              <Data label="10kg">{props.data.gas["10kg"]}</Data>
              <Data label="18kg">{props.data.gas["18kg"]}</Data>
              <Data label="27kg">{props.data.gas["27kg"]}</Data>
              <Data label="43kg">{props.data.gas["43kg"]}</Data>
              <Data label="Total">
                {getTotalGas(props.data as ComunalRecord) || (
                  <span class="fore">—</span>
                )}
              </Data>
            </div>
          </Container>
        </div>
      </article>
    </section>
  );
};
export default Programs;
