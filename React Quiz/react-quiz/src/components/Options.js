export default function Options({ questions, dispatch, answer }) {
  return (
    <div className="options">
      {questions.options.map((el, i) => (
        <button
          className={`btn btn-option ${i === answer ? "answer" : ""} ${
            answer !== null
              ? i === questions.correctOption
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
