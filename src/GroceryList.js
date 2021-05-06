import React from "react";

const GroceryList = (props) => {
  return (
    <>
      <button type="button" onClick={() => props.getList()}>
        Refresh
      </button>
      <button type="button" onClick={() => props.toggleSort()}>
        Sort By Department
      </button>
      <ul>
        {props.list.map((thing, i) => (
          <li key={i}>
            {thing.item} ({thing.dept})
            <button
              name={`${thing.item}-${thing.dept}`}
              onClick={() => props.deleteItem(thing)}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default GroceryList;
