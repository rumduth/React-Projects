import { useState } from "react";
const faqs = [
  {
    title: "Where are these chairs assembled?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
  },
  {
    title: "How long do I have to return my chair?",
    text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
  },
  {
    title: "Do you ship to countries outside the EU?",
    text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!",
  },
];

export default function App() {
  return (
    <div className="accordion">
      <Accordion data={faqs} />
    </div>
  );
}

function Accordion({ data }) {
  const [open, setOpen] = useState(
    Array.from({ length: data.length }, () => false)
  );
  function handleOpen(index) {
    let updateOpen = open.map((el, i) => (i === index ? !el : false));

    setOpen(() => updateOpen);
  }
  return (
    <div>
      {data.map((d, i) => (
        <AccordionItem
          num={i + 1}
          title={d.title}
          isOpen={open[i]}
          key={i}
          handleOpen={handleOpen}
        >
          {d.text}
        </AccordionItem>
      ))}
    </div>
  );
}
function AccordionItem({ num, title, children, isOpen, handleOpen }) {
  return (
    <div
      className={`item ${isOpen ? "open" : ""}`}
      onClick={() => handleOpen(num - 1)}
    >
      <p className="number">{num < 9 ? `0${num}` : `${num}`}</p>
      <p className="title">{title}</p>
      <p className="icon">{isOpen ? "-" : "+"}</p>
      {isOpen && <div className="content-box">{children}</div>}
    </div>
  );
}
