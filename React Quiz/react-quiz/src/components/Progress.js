export default function Progress({
  i,
  numsQuestion,
  points,
  totalPoints,
  answer,
}) {
  return (
    <header className="progress">
      <progress
        max={numsQuestion}
        value={answer !== null ? i : i - 1}
      ></progress>
      <p>
        Question <strong>{i}</strong> / {numsQuestion}
      </p>

      <p>
        <strong>{points}</strong> / {totalPoints}
      </p>
    </header>
  );
}
