import React from "react";

const Forms = (props) => {
  const depts = [
    "Misc",
    "Produce",
    "Bakery",
    "Meat",
    "Beer and Wine",
    "Canned Goods",
    "Dairy",
    "Dry Foods",
    "International",
    "Health and Beauty",
    "Paper Products",
  ];
  return (
    <>
      <h2>Access Your List</h2>
      <form onSubmit={props.getList}>
        <label>
          Enter Your Name:
          <input
            type="text"
            name="userForm"
            value={props.userForm}
            onChange={(e) => props.handleChange(e)}
          ></input>
        </label>
        <input type="submit" value="Submit"></input>
      </form>
      <br />
      <form onSubmit={props.postItem}>
        <label>
          Add To Your List:
          <select
            name="department"
            value={props.department}
            onChange={(e) => props.handleChange(e)}
          >
            {depts.map((dept) => {
              return <option value={`${dept}`}>{dept}</option>;
            })}
          </select>
          <input
            type="text"
            name="itemForm"
            value={props.itemForm}
            onChange={(e) => props.handleChange(e)}
          />
        </label>
        <input type="submit" value="Submit"></input>
      </form>
      <h2>{props.userForm}'s List</h2>
    </>
  );
};

export default Forms;
