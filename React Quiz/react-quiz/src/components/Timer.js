import { useEffect } from "react";
import { useQuizzes } from "../contexts/QuizContext";

function convertSecondsToMMSS(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
}

let id;
export default function Timer() {
  const { dispatch, timeRemaining } = useQuizzes();
  useEffect(function () {
    let id = setInterval(function () {
      dispatch({ type: "tick" });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return <div className="timer">{convertSecondsToMMSS(timeRemaining)}</div>;
}
