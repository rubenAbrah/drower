// import { useRef } from 'react';

// export default function CatFriends() {
//   const itemsRef = useRef(null);

 
//   function getMap() {
//     if (!itemsRef.current) {
//       // Initialize the Map on first usage.
//       itemsRef.current = new Map();
//     }
//     return itemsRef.current;
//   }

//   return (
//     <>
//       <nav>
//         <button onClick={() => scrollToId(0)}>
//           Tom
//         </button>
//         <button onClick={() => scrollToId(5)}>
//           Maru
//         </button>
//         <button onClick={() => scrollToId(9)}>
//           Jellylorum
//         </button>
//       </nav>
//       <div>
//         <ul>
//           {catList.map(cat => (
//             <li
//               key={cat.id}
//               ref={(node) => {
//                 const map = getMap();
//                 if (node) {
//                   console.log(node)
//                   map.set(cat.id, node);
//                 } else {
//                   console.log('68')
//                   map.delete(cat.id);
//                 }
//               }}
//             >
//               <img
//                 src={cat.imageUrl}
//                 alt={'Cat #' + cat.id}
//               />
//             </li>
//           ))}
//         </ul>
//       </div>
//     </>
//   );
// }

// const catList = [];
// for (let i = 0; i < 57; i++) {
//   catList.push({
//     id: i,
//     imageUrl: 'https://placekitten.com/250/200?image=' + i
//   });
// }


import "bootstrap/dist/css/bootstrap.min.css";
import {  useEffect, useRef, useState,forwardRef, useId   } from "react";
function App() {
  
  const [wrapperItems, setWrapperItems] = useState([ <RowComponent/> ]);
  const itemsRef = useRef(null); 
  function getMap() {
    if (!itemsRef.current) {
      // Initialize the Map on first usage.
      itemsRef.current = new Map();
    }
    return itemsRef.current;
  }
  const editorWrapper = useRef()
  let editorWrapperItems
  useEffect(() => {
    editorWrapperItems = editorWrapper.current.querySelectorAll('div,span,p')
    listenChangeActive(editorWrapperItems)

  }, [])

  function listenChangeActive(editorWrapperItems) {
    editorWrapperItems.forEach(item => {
      item.addEventListener('click', changeActiveItem)
    });
  }
  useEffect(() => { 
    editorWrapperItems = editorWrapper.current.querySelectorAll('div,span,p')
    listenChangeActive(editorWrapperItems)
  }, [wrapperItems])
  function addRow() {
    setWrapperItems([...wrapperItems, <RowComponent 
      ref={(node) => { 
        const map = getMap();
        if (node) {  
          map.set(map.size()+1, node);
          console.log(map)
        } else { 
          map.delete(map.size()+1);
        }
      }}
      />]); 
  }
  function addColumn() {
    setWrapperItems([...wrapperItems, <ColumnComponent />]);
    editorWrapperItems = editorWrapper.current.querySelectorAll('div,span,p')
    // console.log(editorWrapperItems)
  }
  // async function addButton() {
  //   const { default: Button } = await import(`./Button.jsx`);
  //   setComps([...comps, <Button />]);
  // }

  


  function changeActiveItem(e) {
    e.stopPropagation()
    e.preventdefault
    editorWrapperItems.forEach(e => { if (e.id === 'active') { return e.id = '' } })
    e.target.id = 'active'
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
        <div className="col-8 d-flex flex-column  " ref={editorWrapper}>
          {wrapperItems.map((el, i) => (
            <div key={i} className="row">
              {el}
            </div>
          ))}
        </div>
        <div className="col-2 d-flex">
          <hr className="bg-black m-0 p-1  border " />
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
        </div>
      </div>
    </>
  );
}

export default App;

const RowComponent = forwardRef(function RowComponent({children}, ref) { 
  return <div className="row" ref={ref}>{children ?? <div className="w-100 p-1 border text-center my-1">+</div>}</div>;

});


// function RowComponent({ children }) {
//   return <div className="row">{children ?? <div className="w-100 p-1 border text-center my-1">+</div>}</div>;
// }
function ColumnComponent({ children, col = 12 }) {
  return <div className={`col-${col}`}>{children}</div>;
}










