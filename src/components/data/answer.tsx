import { Match, Switch } from "solid-js";
import { CancelRoundFilled, QuestionFilled, Check } from "../../icons";
import { Question } from "../../types/form";

type AnswerProps = {
  value: Question;
};

const Answer = (props: AnswerProps) => {
  return (
    <span class="flex items-center justify-center">
      <Switch
        fallback={
          <QuestionFilled class="scale-90 !fill-neutral-500 dark:!fill-neutral-400" />
        }
      >
        <Match when={props.value === 1}>
          <Check class="scale-130 **:fill-green-600" />
        </Match>
        <Match when={props.value === 0}>
          <CancelRoundFilled class="!fill-red-500" />
        </Match>
      </Switch>
    </span>
  );
};
export default Answer;
