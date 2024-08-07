import { useQuizzes } from "../contexts/QuizContext";

export default function NextButton() {
  const { dispatch, index, questions } = useQuizzes();
  const totalQuestions = questions.length;
  return (
    <button
      className="btn btn-ui"
      onClick={() => {
        index === totalQuestions - 1
          ? dispatch({ type: "finish" })
          : dispatch({ type: "nextQuestion" });
      }}
    >
      Next
    </button>
  );
}
