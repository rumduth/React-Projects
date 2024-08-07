import { useQuizzes } from "../contexts/QuizContext";

export default function Options() {
  const { index, questions, dispatch, answer } = useQuizzes();
  return (
    <div className="options">
      {questions[index].options.map((el, i) => (
        <button
          className={`btn btn-option ${i === answer ? "answer" : ""} ${
            answer !== null
              ? i === questions[index].correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={i}
          onClick={() => dispatch({ type: "newAnswer", payload: i })}
          disabled={answer !== null}
        >
          {el}
        </button>
      ))}
    </div>
  );
}
