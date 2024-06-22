import { useState } from "react";

export default function App() {
  return <DateDisplay />;
}

function DateDisplay() {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const [step, setStep] = useState(0);
  const [count, setCount] = useState(0);
  const [date, setDate] = useState(new Date().getDate());

  function dateIncrease() {
    setStep((step) => {
      step = step + 1;
      setDate(
        (date) => new Date().getTime() + 24 * 60 * 60 * 1000 * count * step
      );
      return step;
    });
  }

  function dateDecrease() {
    setStep((step) => {
      step = step - 1;
      setDate(
        (date) => new Date().getTime() + 24 * 60 * 60 * 1000 * count * step
      );
      return step;
    });
  }

  function countIncrease() {
    setCount((count) => {
      count = count + 1;
      setDate(
        (date) => new Date().getTime() + 24 * 60 * 60 * 1000 * count * step
      );
      return count;
    });
  }

  function countDecrease() {
    setCount((count) => {
      count = count > 0 ? count - 1 : 0;
      setDate(
        (date) => new Date().getTime() + 24 * 60 * 60 * 1000 * count * step
      );
      return count;
    });
  }

  return (
    <>
      <div className="step">
        <button onClick={dateDecrease}>-</button>Step: {step}
        <button onClick={dateIncrease}>+</button>
      </div>
      <div className="step">
        <button onClick={countDecrease}>-</button>Count: {count}
        <button onClick={countIncrease}>+</button>
      </div>

      <p style={{ textAlign: "center", color: "blue" }}>
        {`${
          Math.abs(count * step) === 0
            ? ""
            : Math.abs(count * step) > 1
            ? Math.abs(count * step) + " days "
            : "1 day "
        }`}

        {`${
          count * step === 0
            ? "Today is "
            : count * step < 0
            ? "before today is "
            : "after today is "
        }`}

        {new Intl.DateTimeFormat("en-US", options).format(date)}
      </p>
    </>
  );
}

function Step() {
  const [step, setStep] = useState(0);
  return (
    <div className="step">
      <button onClick={() => setStep((step) => step - 1)}>-</button>Step: {step}
      <button onClick={() => setStep((step) => step + 1)}>+</button>
    </div>
  );
}

function Count() {
  const [count, setCount] = useState(0);
  return (
    <div className="step">
      <button onClick={() => setCount((count) => count - 1)}>-</button>Count:{" "}
      {count}
      <button onClick={() => setCount((count) => count + 1)}>+</button>
    </div>
  );
}
