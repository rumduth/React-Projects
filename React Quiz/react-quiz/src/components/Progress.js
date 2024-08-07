import { useQuizzes } from "../contexts/QuizContext";

export default function Progress() {
  const { index, questions, points, totalPoints, answer } = useQuizzes();
  let i = index + 1;
  let numsQuestion = questions.length;
  return (
    <header className="progress">
      <progress
        max={numsQuestion}
        value={answer !== null ? i : i - 1}
      ></progress>
      <p>
        Question <strong>{i}</strong> / {numsQuestion}
      </p>

      <p>
        <strong>{points}</strong> / {totalPoints}
      </p>
    </header>
  );
}
