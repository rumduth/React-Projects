import { createContext, useContext, useReducer, useEffect } from "react";

const QuizContext = createContext();

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

function reduce(state, action) {
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

function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(reduce, initialState);
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
    <QuizContext.Provider value={{ ...state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
}

function useQuizzes() {
  let context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("You are accessing quiz outside of its scope");
  return context;
}
export { QuizProvider, useQuizzes };
