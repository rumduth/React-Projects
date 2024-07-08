import { useReducer } from "react";
import "./styles.css";

const intialState = {
  isOpen: false,
  balance: 0,
  loan: 0,
};
function reduce(state, action) {
  switch (action.type) {
    case "openAccount":
      return { ...state, isOpen: true, balance: 500 };
    case "deposit": {
      return { ...state, balance: state.balance + 150 };
    }
    case "withdraw":
      if (state.balance >= 50) return { ...state, balance: state.balance - 50 };
      else {
        alert("Not enough money to withdraw");
        return state;
      }
    case "requestLoan":
      if (state.loan > 0) {
        alert("You haven't pay previous loan yet!");
        return state;
      } else {
        return { ...state, loan: 800, balance: state.balance + 800 };
      }
    case "payLoan":
      if (state.balance >= 800 && state.loan > 0) {
        return { ...state, loan: 0, balance: state.balance - 800 };
      } else if (state.loan > 0) {
        alert("Not enough money to pay loan");
        return state;
      } else {
        alert("You have no loan to pay for");
        return state;
      }
    case "closeAccount":
      if (state.loan > 0 || state.balance > 0) {
        alert("Please pay loan or withdraw you money in our bank");
        return state;
      } else {
        return { ...intialState };
      }
  }
}

export default function App() {
  const [{ isOpen, loan, balance }, dispatch] = useReducer(reduce, intialState);

  return (
    <div className="App">
      <h1>useReducer Bank Account</h1>
      <p>
        &copy; <strong>Thong-Nguyen</strong>
      </p>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>

      <p>
        <button
          onClick={() => dispatch({ type: "openAccount" })}
          disabled={isOpen}
        >
          Open account
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "deposit" });
          }}
          disabled={!isOpen}
        >
          Deposit 150
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "withdraw" });
          }}
          disabled={!isOpen}
        >
          Withdraw 50
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "requestLoan" });
          }}
          disabled={!isOpen}
        >
          Request a loan of 800
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "payLoan" });
          }}
          disabled={!isOpen}
        >
          Pay loan
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "closeAccount" });
          }}
          disabled={!isOpen}
        >
          Close account
        </button>
      </p>
    </div>
  );
}
