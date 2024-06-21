import { useState } from "react";

export default function App() {
  return (
    <div className="display">
      <DisplayDate />
    </div>
  );
}

function DisplayDate() {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);
  let date = new Date();

  const handleReset = () => {
    setStep(() => 1);
    setCount(() => 0);
    date = new Date();
  };
  return (
    <>
      <div>
        <input
          type="range"
          min="1"
          max="10"
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
        ></input>
        <span>Step: {step}</span>
      </div>
      <div>
        <button onClick={(e) => setCount(count - step)}>-</button>
        <input
          type="text"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
        ></input>
        <button onClick={(e) => setCount(count + step)}>+</button>
      </div>

      <p>
        {count === 0
          ? "Today is "
          : count > 0
          ? `${count} days from today is `
          : `${-count} days before is `}

        {new Intl.DateTimeFormat("en-US", options).format(
          date.getTime() + 24 * 60 * 60 * 1000 * count
        )}
      </p>
      {count !== 0 || step !== 1 ? (
        <button onClick={handleReset}>Reset</button>
      ) : null}
    </>
  );
}
