import "bootstrap/dist/css/bootstrap.min.css";
import { Children, useEffect, useRef, useState } from "react";
function App() {
  const [wrapper, setWrapper] = useState([<div className="col"></div>]);
  function addRow() {
    setWrapper([...wrapper, <RowComponent children={1} />]);
  }
  const [comps, setComps] = useState([<Comp1 />, <Comp2 />]);
  async function addComp() {
    const { default: Button } = await import(`./Button.tsx`); 
    console.log(Button);
     setComps([...comps, <Button/> ]);
  }
  return (
    <>
      <div className="row">
        <div className="col-3 d-flex">
          <div className="d-flex flex-column">
            <div className="row">
              <span className="btn" onClick={addRow}>
                add row
              </span>
              <span className="btn" onClick={addComp}>
                add column
              </span>
            </div>
          </div>
          <hr className="bg-black m-0 p-1  border " />
        </div>
        <div className="col-9 d-flex flex-column">
          {wrapper.map((el, i) => (
            <div key={i} className="row">
              {el}
            </div>
          ))}
          {comps.map((el, idx) => {
            return <div key={idx}>{el}</div>;
          })}
        </div>
      </div>
    </>
  );
}

export default App;

function RowComponent({ children }) {
  return <div className="row">{children}</div>;
}
function ColumnComponent({ children, col }) {
  return <div className={`col-${col}`}>{children}</div>;
}
const Comp1 = () => {
  return <>Comp1</>;
};
const Comp2 = () => {
  return <>Comp2</>;
};
