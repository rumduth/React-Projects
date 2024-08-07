import { useQuizzes } from "../contexts/QuizContext";
import { useEffect } from "react";

export default function FinishScreen() {
  const { points, totalPoints, highScore, dispatch } = useQuizzes();

  const percentage = (points / totalPoints) * 100;
  let emoji;
  if (percentage === 100) emoji = "🥇";
  else if (percentage >= 80) emoji = "🥈";
  else if (percentage >= 50) emoji = "🥉";
  else if (percentage >= 0) emoji = "🎉";
  else emoji = "😟";

  const newHighScore = Math.max(highScore, points);

  useEffect(() => {
    localStorage.setItem("highestScore", newHighScore);
  }, [newHighScore]);

  return (
    <>
      <p className="result">
        <span>{emoji}</span>
        You scored <strong>{points}</strong> out of {totalPoints} (
        {percentage.toFixed(2)}%)
      </p>
      <p className="highscore">(High score: {newHighScore} points)</p>
      <button
        onClick={() => dispatch({ type: "restart" })}
        className="btn btn-ui"
      >
        Restart Quiz
      </button>
    </>
  );
}
