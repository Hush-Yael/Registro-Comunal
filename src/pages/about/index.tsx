import SectionTitle from "../../components/section-title";
import { About as AboutIcon } from "../../icons/aside";
import { Tabs } from "@kobalte/core/tabs";
import Techs from "./tabs/techs";
import Personal from "./tabs/personal";

const About = () => {
  return (
    <main class="p-4">
      <SectionTitle>
        Acerca de
        <AboutIcon class="fore" />
      </SectionTitle>
      <Tabs>
        <Tabs.List class="tab-list">
          <Tabs.Trigger class="py-1 px-2" value="personal">
            Personal
          </Tabs.Trigger>
          <Tabs.Trigger class="py-1 px-2" value="techs">
            Tecnologías
          </Tabs.Trigger>
          <Tabs.Indicator class="tab-indicator" />
        </Tabs.List>
        <Tabs.Content value="personal">
          <Personal />
        </Tabs.Content>
        <Tabs.Content value="techs">
          <Techs />
        </Tabs.Content>
      </Tabs>
    </main>
  );
};
export default About;
