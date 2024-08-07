import { useQuizzes } from "../contexts/QuizContext";

export default function StartScreen() {
  const { questions, dispatch } = useQuizzes();
  const numberQuestions = questions.length;
  return (
    <div className="start">
      <h2>Welcome to the React Quiz!</h2>
      <h3>{numberQuestions} question to test your React mastery</h3>
      <button
        onClick={() => dispatch({ type: "start" })}
        className="btn btn-ui"
      >
        Let's start
      </button>
    </div>
  );
}
