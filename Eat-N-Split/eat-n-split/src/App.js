import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [friends, setFriend] = useState(initialFriends);
  const [addFriend, setAddFriend] = useState(false);
  const [shareBill, setShareBills] = useState(
    Array.from({ length: initialFriends.length }, () => false)
  );
  let friendShareBillIndex = shareBill.findIndex((e) => e === true);

  const handleSelectFriend = function (index) {
    const updateShare = shareBill.map((v, i) => (i === index ? !v : false));
    setShareBills(() => updateShare);
  };

  const handleAddFriend = function (name, image) {
    const newFriendsList = [
      ...friends,
      { name, image, balance: 0, id: Date.now() },
    ];
    setFriend(() => newFriendsList);
  };

  const handleSplitBill = (yourAmt, friendAmt, payer) => {
    const updateBill = [...initialFriends];
    payer === 0
      ? (updateBill[friendShareBillIndex].balance += friendAmt)
      : (updateBill[friendShareBillIndex].balance -= yourAmt);

    setFriend(updateBill);
    setShareBills(Array.from({ length: initialFriends.length }, () => false));
  };
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          onSelectFriend={handleSelectFriend}
          shareBill={shareBill}
        />
        {addFriend ? (
          <>
            <FormAddFriend onAddFriend={handleAddFriend} />
            <Button onClick={() => setAddFriend(false)}>Close</Button>
          </>
        ) : (
          <Button onClick={() => setAddFriend(true)}>Add Friend</Button>
        )}
      </div>
      {friendShareBillIndex != -1 && (
        <FormSplitBill
          key={friendShareBillIndex}
          onSplitBill={handleSplitBill}
          name={friends[friendShareBillIndex].name}
        />
      )}
    </div>
  );
}

function FriendsList({ friends, onSelectFriend, shareBill }) {
  return (
    <ul>
      {friends.map((friend, i) => (
        <Friend
          friend={friend}
          key={i}
          index={i}
          onSelectFriend={onSelectFriend}
          select={shareBill[i]}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, index, onSelectFriend, select }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      <p
        style={
          friend.balance > 0
            ? { color: "green" }
            : friend.balance < 0
            ? { color: "red" }
            : {}
        }
      >
        {friend.balance < 0
          ? `You own ${friend.name} ${-friend.balance}$`
          : friend.balance === 0
          ? `You and ${friend.name} are even`
          : `${friend.name} owes you $${friend.balance}`}
      </p>

      <Button onClick={() => onSelectFriend(index)}>
        {select ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function Button({ children, onClick }) {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  );
}

function FormAddFriend({ onAddFriend }) {
  const handleAdd = (e) => {
    e.preventDefault();
    let name = e.target[0].value,
      image = e.target[1].value;
    if (!name || !image) return;
    e.target[0].value = "";
    e.target[1].value = "";
    onAddFriend(e.target[0].value, e.target[1].value);
  };
  return (
    <form className="form-add-friend" onSubmit={handleAdd}>
      <label>👫 Friend name</label>
      <input type="text"></input>
      <label>🌆 Image URL</label>
      <input type="text"></input>
      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ onSplitBill, name }) {
  const [bill, setBill] = useState("");
  const [yourAmt, setYourAmt] = useState("");
  const [payer, setPayer] = useState(0);

  const handleBill = (e) => {
    // e.preventDefault();
    let amt = parseInt(e.target.value);
    if (amt < 0) amt = 0;
    if (isNaN(amt)) amt = "";
    setBill(() => amt);
  };

  const handleAmt = (e) => {
    // e.preventDefault();
    let amt = parseInt(e.target.value);
    if (amt < 0) amt = 0;
    if (amt > bill) amt = bill;
    if (isNaN(amt)) amt = "";
    setYourAmt(() => amt);
  };

  const handlePayer = (e) => {
    // e.preventDefault();
    setPayer(() => Number(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSplitBill(yourAmt, bill - yourAmt, payer);
    setBill("");
    setYourAmt("");
    setPayer(0);
  };
  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {name}</h2>
      <label>💵 Bill value</label>
      <input type="text" value={bill} onChange={handleBill} />

      <label>🙋‍♂️Your expense</label>
      <input type="text" value={yourAmt} onChange={handleAmt}></input>

      <label>💁‍♂️X's expense</label>
      <input type="text" disabled value={bill - yourAmt}></input>

      <label>🤑 Who is paying the bill?</label>
      <select value={payer} onChange={handlePayer}>
        <option value={0}>You</option>
        <option value={1}>{name}</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}
