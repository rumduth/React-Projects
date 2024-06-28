import { useEffect, useState } from "react";

export default function App() {
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [amt, setAmt] = useState(100);
  const [convertAmt, setConvertAmt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(
    function () {
      const controller = new AbortController();
      async function convertCurrency() {
        try {
          setIsLoading(true);
          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${parseFloat(
              amt
            )}&from=${from}&to=${to}`,
            { signal: controller.signal }
          );
          const data = await res.json();
          setConvertAmt(data.rates[to]);
        } catch (e) {
        } finally {
          setIsLoading(false);
        }
      }
      if (from === to) {
        setConvertAmt(amt);
      } else convertCurrency();
    },
    [amt, from, to]
  );

  return (
    <>
      <div className="app-converted">
        <input
          type="text"
          value={amt}
          disabled={isLoading ? true : false}
          onChange={(e) => setAmt(e.target.value)}
        ></input>
        <select
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          disabled={isLoading ? true : false}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
        <select
          value={to}
          onChange={(e) => setTo(e.target.value)}
          disabled={isLoading ? true : false}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
      </div>
      <div className="output">
        {isLoading ? "...Loading" : `${convertAmt} ${to}`}
      </div>
    </>
  );
}
