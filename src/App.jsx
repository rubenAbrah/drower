import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useRef, useState, forwardRef, createElement } from "react";

function App() {
  const itemsRef = useRef(null);
  function getMap() {
    if (!itemsRef.current) {
      itemsRef.current = sr;
    }
    return itemsRef.current;
  }

  const wrapperRef = useRef();
  const [wrapperItems, setWrapperItems] = useState([
    createElement(
      "div",
      {
        className: "row",
        onClick: changeActive,
      },
      <div className="w-100 p-1 border text-center">+</div>
    ),
  ]);

  function changeActive(e) {
    document
      .querySelectorAll(".contentWrapper #active")
      .forEach((el) => (el.id = ""));
    e.preventDefault();
    e.stopPropagation();

    e.target.id = "active";

    console.log(e.target);
  }

  function addColumn() {
    let active = wrapperRef.current.querySelector("#active");
    if (active) {
    //  itemsRef.current[0].children = createElement("a", { className: "name" }, "231");
    }
  }
  function addRow() {
    setWrapperItems([
      ...wrapperItems,
      createElement(
        "div",
        {
          ref: (node) => {
            const map = getMap();
            if (node) {
              map.set(map.size + 1, node);
            }
            console.log(itemsRef.current);
          },
          className: "row",
          onClick: changeActive,
        },
        <div className="w-100 p-1 border text-center">+</div>
      ),
    ]);
  }

  return (
    <>
      <div className="row min-vh-100">
        <div className="col-2 d-flex">
          <div className="d-flex flex-column">
            <div className="row">
              <span className="btn" onClick={addRow}>
                add row
              </span>
              <span className="btn" onClick={addColumn}>
                add column
              </span>
            </div>
          </div>
          <hr className="bg-black m-0 p-1  border " />
        </div>
        <div
          className="col-8 d-flex flex-column contentWrapper"
          ref={wrapperRef}
        >
          {wrapperItems.map((el, i) => (
            <div key={i}>{el}</div>
          ))}
        </div>
        <div className="col-2 d-flex">
          <hr className="bg-black m-0 p-1  border " />
          <div className="d-flex flex-column">
            <div className="row">
              <div className="col-12 border my-2 ms-auto p-0 w-75">
                <input type="text" className="w-100" />
              </div>
              <div className="col-12 border my-2 ms-auto  p-0 w-75">
                <input type="text" className="w-100" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

const RowComponent = forwardRef(function RowComponent({ children }, ref) {
  return (
    <div className="row" ref={ref}>
      {children ?? <div className="w-100 p-1 border text-center my-1">+</div>}{" "}
    </div>
  );
});

function ColumnComponent({ children, col = 12 }) {
  return <div className={`col-${col}`}>{children}</div>;
}
