import { useState } from "react";
import { Item } from "./Item";

export default function PackingList({
  items,
  onDeleteItem,
  onToggleItem,
  onClearList,
}) {
  const [sortBy, setSortBy] = useState("input");
  let sortedItems = [...items];
  if (sortBy === "description") {
    sortedItems.sort((a, b) => a.description.localeCompare(b.description));
    console.log(sortedItems);
  }
  if (sortBy === "packed") {
    sortedItems.sort((a, b) => Number(a.packed) - Number(b.packed));
  }
  if (sortBy === "quantity")
    sortedItems.sort((a, b) => a.quantity - b.quantity);

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
            key={item.id}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="quantity">Sort by quantity order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onClearList}>Clear list</button>
      </div>
    </div>
  );
}
