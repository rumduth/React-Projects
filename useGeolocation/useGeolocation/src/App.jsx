import { useState, useEffect } from "react";
import { useCustomHook } from "./useCustomHook";
import "./App.css";

export default function App() {
  const [count, setCount] = useState(0);
  const [isLoadng, position, getPos] = useCustomHook();
  function handleClick() {
    setCount((cnt) => cnt + 1);
    getPos();
  }

  return (
    <div>
      <button onClick={handleClick} disabled={isLoadng}>
        Get my position
      </button>
      {isLoadng ? (
        <Load />
      ) : (
        <p>
          Your GPS position is:{" "}
          <a
            href={`https://www.openstreetmap.org/#map=16/${position[0]}/${position[1]}`}
          >
            {position[0]}, {position[1]}
          </a>
        </p>
      )}
      <p>You requested position {count} times</p>
    </div>
  );
}

function Load() {
  return <div>Loading...</div>;
}
