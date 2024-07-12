import Headers from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";
import { useEffect, useReducer } from "react";
import { useQuizzes } from "../contexts/QuizContext";

export default function App() {
  const { status, answer } = useQuizzes();

  return (
    <div className="app">
      <Headers />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}

        {status === "active" && (
          <>
            <Progress />
            <Question />
            <Footer>
              <Timer />
              {answer !== null && <NextButton />}
            </Footer>
          </>
        )}

        {status === "finish" && <FinishScreen />}
      </Main>
    </div>
  );
}
