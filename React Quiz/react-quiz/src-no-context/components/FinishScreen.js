export default function FinishScreen({
  points,
  totalPoints,
  highScore,
  dispatch,
}) {
  const percentage = (points / totalPoints) * 100;
  let emoji;
  if (percentage === 100) emoji = "🥇";
  else if (percentage >= 80) emoji = "🥈";
  else if (percentage >= 50) emoji = "🥉";
  else if (percentage >= 0) emoji = "🎉";
  else emoji = "😟";
  highScore = Math.max(highScore, points);
  localStorage.setItem("highestScore", highScore);
  return (
    <>
      <p className="result">
        <span>{emoji}</span>
        Your scored <strong>{points}</strong> out of {totalPoints} (
        {percentage.toFixed(2)}%)
      </p>
      <p className="highscore">(Highscore: {highScore} points)</p>
      <button
        onClick={() => dispatch({ type: "restart" })}
        className="btn btn-ui"
      >
        Restart Quiz
      </button>
    </>
  );
}
