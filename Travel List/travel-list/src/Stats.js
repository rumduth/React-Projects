export function Stats({ items }) {
  if (!items.length)
    return (
      <footer className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </footer>
    );
  const numItems = items.length;
  const packedItems = items.reduce((acc, item) => {
    return item.packed ? acc + 1 : acc;
  }, 0);
  return (
    <footer className="stats">
      <em>
        {numItems === packedItems
          ? "You got everything! Ready to go ✈️"
          : `You have ${numItems} items on your list, and you already packed
      ${packedItems} (${((packedItems / numItems) * 100).toFixed(2)}%)`}
      </em>
    </footer>
  );
}
