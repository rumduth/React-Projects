export default function NextButton({ dispatch, index, totalQuestions }) {
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
