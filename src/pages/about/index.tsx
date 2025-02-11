import SectionTitle from "../../components/section-title";
import { Tabs } from "@kobalte/core/tabs";
import Techs from "./tabs/techs";
import Personal from "./tabs/personal";
import { Question } from "../../icons";

const About = () => {
  return (
    <main class="p-4">
      <SectionTitle>
        Acerca de
        <Question class="fore" />
      </SectionTitle>
      <Tabs class="tabs">
        <Tabs.List class="tab-list">
          <Tabs.Trigger value="personal">Personal</Tabs.Trigger>
          <Tabs.Trigger value="techs">Tecnologías</Tabs.Trigger>
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
