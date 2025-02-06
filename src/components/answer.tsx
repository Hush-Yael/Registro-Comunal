import { Match, Switch } from "solid-js";
import { CancelRoundFilled, QuestionFilled, Check } from "../icons";

type AnswerProps = {
  value: boolean | null;
};

const Answer = (props: AnswerProps) => {
  return (
    <span class="flex items-center justify-center">
      <Switch
        fallback={
          <QuestionFilled class="!fill-neutral-500 dark:!fill-neutral-400" />
        }
      >
        <Match when={props.value === true}>
          <Check class="scale-130 **:fill-green-600" />
        </Match>
        <Match when={props.value === false}>
          <CancelRoundFilled class="!fill-red-500" />
        </Match>
      </Switch>
    </span>
  );
};
export default Answer;
