import { useQuizzes } from "../contexts/QuizContext";
import Options from "./Options";
export default function Question() {
  const { index, questions } = useQuizzes();

  return (
    <div>
      <h4>{questions[index].question}</h4>
      <Options />
    </div>
  );
}
