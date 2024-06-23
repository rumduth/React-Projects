import { useState } from "react";

export default function App() {
  const [bill, setBill] = useState(0);
  const [tip, setTip] = useState([5, 5]);
  function handleBill(val) {
    setBill(() => val);
  }
  function handleTip(index, percentage) {
    let currentTip = [...tip];
    currentTip[index] = percentage;
    setTip(() => currentTip);
  }
  function handleReset() {
    setBill(0);
    setTip([5, 5]);
  }
  let totalTip =
    Math.round((tip.reduce((acc, cur) => acc + cur, 0) / 2) * bill * 100) /
    100 /
    100;
  let totalBill = bill + totalTip;

  return (
    <div>
      <Bill handleBill={handleBill} bill={bill}>
        How much is the bill?
      </Bill>
      <Service index={0} handleTip={handleTip} tip={tip[0]}>
        How did you like the service?
      </Service>
      <Service index={1} handleTip={handleTip} tip={tip[1]}>
        How did your friend like the service?
      </Service>

      {bill > 0 && (
        <>
          <h1>
            You pay ${totalBill} (${bill} + ${totalTip} tip)
          </h1>
          <button onClick={handleReset}>Reset</button>
        </>
      )}
    </div>
  );
}

function Bill({ handleBill, children, bill }) {
  return (
    <div>
      {children}
      <input
        type="text"
        value={bill > 0 ? bill : ""}
        onChange={(e) => handleBill(parseInt(e.target.value))}
      />
    </div>
  );
}

function Service({ index, handleTip, children, tip }) {
  return (
    <div>
      {children}
      <select
        value={tip}
        onChange={(e) => handleTip(index, Number(e.target.value))}
      >
        <option value={0}>Dissatisfied (0%)</option>
        <option value={5}>It was okay (5%)</option>
        <option value={10}>It was good (10%)</option>
        <option value={20}>Absolutely Amazing! (20%)</option>
      </select>
    </div>
  );
}
