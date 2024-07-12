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

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  totalPoints: 0,
  highScore: localStorage.getItem("highestScore") || 0,
  timeRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      let totalPoints = state.questions.reduce(
        (prev, cur) => prev + cur.points,
        0
      );
      return {
        ...state,
        questions: action.payload,
        status: "ready",
        totalPoints: totalPoints,
      };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start": {
      return {
        ...state,
        status: "active",
        timeRemaining: state.questions.length * 5,
      };
    }
    case "newAnswer":
      let correct =
        state.questions[state.index].correctOption === action.payload;
      return {
        ...state,
        answer: action.payload,
        points: correct
          ? state.points + state.questions[state.index].points
          : state.points - state.questions[state.index].points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return { ...state, status: "finish" };
    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };
    case "tick":
      return {
        ...state,
        timeRemaining: state.timeRemaining - 1,
        status: state.timeRemaining === 0 ? "finish" : state.status,
      };
    default:
      throw new Error("Action is unknown");
  }
}

export default function App() {
  const [
    {
      questions,
      status,
      index,
      answer,
      points,
      totalPoints,
      highScore,
      timeRemaining,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  useEffect(function () {
    async function getData() {
      try {
        const res = await fetch("http://localhost:9000/questions");
        const questions = await res.json();
        dispatch({ type: "dataReceived", payload: questions });
      } catch (e) {
        dispatch({ type: "dataFailed" });
      }
    }
    getData();
  }, []);

  return (
    <div className="app">
      <Headers />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numberQuestions={questions.length} dispatch={dispatch} />
        )}

        {status === "active" && (
          <>
            <Progress
              i={index + 1}
              numsQuestion={questions.length}
              points={points}
              totalPoints={totalPoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} timeRemaining={timeRemaining} />
              {answer !== null && (
                <NextButton
                  dispatch={dispatch}
                  index={index}
                  totalQuestions={questions.length}
                />
              )}
            </Footer>
          </>
        )}

        {status === "finish" && (
          <FinishScreen
            points={points}
            totalPoints={totalPoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
