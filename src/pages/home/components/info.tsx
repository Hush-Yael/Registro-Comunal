import { Tabs } from "@kobalte/core/tabs";
import SectionTitle from "../../../components/layout/section-title";
import { Img, Paper } from "../../../icons/home";
import { For } from "solid-js";
import { breakpoint } from "..";

const r = [
  `Su fundación comenzó en el año 1.951 en los alrededores de la Plaza Bolívar en tierras que pertenecían al señor Ramón Lujambio, este sector se fue poblando poco a poco.`,
  `Otros de los pobladores es el señor Alejandro Uzcátegui, quien relata que las familias residenciadas más antiguas fueron la de los señores Nieve Novoa, Andrés Jiménez, Carmela Alvares, Felipe Farías, Pedro Mejías, Felipe Pereira, Ana Fernández, entre otros. `,
  `También se dice que Ciudad Bolivia solo tenía dos calles, una que entraba al pueblo y bajaba hacia el final, es decir, del Estadio a la Quinta, y otra que subía hasta la salida. `,
  `Hoy día el sector del Estadio Municipal y la cancha deportiva cuenta con 298 habitantes conformadas por 110 familias. Se encuentra ubicado hacia el Este del Municipio Pedraza y colinda de la siguiente manera; NORTE: Barrio el Silencio; SUR: Barrio Piñaludueña; ESTE: Barrio la Quinta; y, OESTE: Plaza Bolívar y Barrio José Antonio Páez.`,
  `Vale resaltar que su importancia en el municipio Pedraza se debe a que pertenece al centro del pueblo, pues sus adyacentes (Plaza Bolívar, Policía Municipal, Concejo Municipal y el Hospital Doctor Francisco Lazo Martí), y que cuenta con todos los servicios públicos: agua, fluido eléctrico, cloacas, aceras, transporte público, aseo urbano y sus calles están asfaltadas. Sin embargo, el único servicio que presenta deficiencias es la poca presión la que llega el agua a los hogares.`,
  `La mayoría de la población residenciada en este sector son en su mayoría educadores, enfermeros, mecánicos, dueños de negocios y establecimientos comerciales (bodegas, restaurantes, licorerías, computación, fotocopiadores, talleres mecánicos y salones de pool). También sus adyacencias podemos encontrar instituciones educativas como el preescolar José Francisco Jiménez, preescolar Bolivariano El Silencio, Unidad Educativa Nuestra Señora de Altagracia y el Liceo Bolivariano Carlos María González Bona.`,
  `En este sector se encuentra un parque recreativo que ha funcionado durante años, que sin embargo se encuentra en franco deterioro. Otro aspecto destacable es que la Iglesia Santo Domingo de Guzmán limita con la culminación del sector El Estadio, subiendo hacia la Plaza Bolívar, habituándose las personas a asistir a misa de fe católica y realizar celebraciones de Semana Santa, Navidad y otras fechas especiales. `,
  `Las fiestas patronales en honor al patrono Santo Domingo de Guzmán durante muchos años fueron celebradas en este sector, pero al construirse el Parque Ferial, cambiaron de sede, aunque las actividades de carnaval y ciertos eventos deportivos siguen manteniendo su vigencia en este sector.`,
];

const Info = () => {
  return (
    <section>
      <SectionTitle>Información general</SectionTitle>
      <Tabs
        class="tabs gap-2"
        orientation={!breakpoint() ? "horizontal" : "vertical"}
        data-list-pos="r"
      >
        <Tabs.List class="tab-list lg:my-2">
          <Tabs.Trigger value="croquis">
            <Img />
            Croquis
          </Tabs.Trigger>
          <Tabs.Trigger value="reseña">
            <Paper />
            Reseña histórica
          </Tabs.Trigger>
          <Tabs.Indicator class="tab-indicator" />
        </Tabs.List>
        <Tabs.Content value="croquis" class="p-2">
          <img
            src="/croquis.png"
            alt="imagen del croquis del sector"
            class="max-h-[500px] rounded-xl bg-white"
          />
        </Tabs.Content>
        <Tabs.Content
          value="reseña"
          class="max-h-[500px] p-2 overflow-auto overscroll-contain"
        >
          <p class="flex flex-col gap-3 indent-6">
            <For each={r}>{(r) => <span>{r}</span>}</For>
          </p>
        </Tabs.Content>
      </Tabs>
    </section>
  );
};
export default Info;
