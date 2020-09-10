import React from "react";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemForm: "",
      groceryList: [],
      userForm: "",
      department: "Misc",
    };
    this.handleChange = this.handleChange.bind(this);
    this.postItem = this.postItem.bind(this);
    this.getList = this.getList.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }
  // componentDidMount() {
  //   this.getList();
  // }
  getList(e) {
    if (e) {
      e.preventDefault();
    }
    // console.log("triggered getList");
    let getObj = {
      method: "get",
      url: `/list/${this.state.userForm}`,
    };
    axios(getObj)
      .then((response) => {
        // console.log(response.data);
        const stringList = response.data;
        const objList = [];
        stringList.forEach((string) => {
          let split = string.split("-");
          objList.push({ item: split[0], dept: split[1] });
        });
        this.setState({ groceryList: objList });
      })
      .catch((err) => {
        console.error(err);
      });
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  postItem(e) {
    let postObj = {
      method: "post",
      url: `/list/${this.state.userForm}`,
      data: { item: this.state.itemForm, dept: this.state.department },
    };
    axios(postObj)
      .then((response) => {
        // console.log(response.data);
        this.getList();
      })
      .catch((err) => {
        console.error(err);
      });
    this.setState({ itemForm: "", department: "Misc" });
    e.preventDefault();
  }
  deleteItem(e) {
    e.preventDefault();
    let deleteObj = {
      method: "delete",
      url: `/list/${this.state.userForm}`,
      params: { item: e.target.name },
    };
    axios(deleteObj)
      .then(() => {
        // console.log("successful deletion!");
        this.getList();
      })
      .catch((err) => {
        console.error(err);
      });
  }
  render() {
    return (
      <>
        <h1>Supermarket Schweep</h1>
        <h2>Access Your List</h2>
        <form onSubmit={this.getList}>
          <label>
            Enter Your Name:
            <input
              type="text"
              name="userForm"
              value={this.state.userForm}
              onChange={this.handleChange}
            ></input>
          </label>
          <input type="submit" value="Submit"></input>
        </form>
        <br />
        <form onSubmit={this.postItem}>
          <label>
            Add To Your List:
            <select
              name="department"
              value={this.state.department}
              onChange={this.handleChange}
            >
              <option value="Misc">Misc</option>
              <option value="Produce">Produce</option>
              <option value="Meat">Meat</option>
              <option value="Beer and Wine">Beer and Wine</option>
              <option value="Canned Goods">Canned Goods</option>
              <option value="Dairy">Dairy</option>
              <option value="Dry Foods">Dry Foods</option>
              <option value="International">International</option>
              <option value="Health and Beauty">Health and Beauty</option>
              <option value="Paper Products">Paper Products</option>
            </select>
            <input
              type="text"
              name="itemForm"
              value={this.state.itemForm}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit"></input>
        </form>
        <h2>{this.state.userForm}'s List</h2>
        <button type="button" onClick={this.getList}>
          Refresh
        </button>
        <ul>
          {this.state.groceryList.map((thing, i) => (
            <li key={i}>
              {thing.item} ({thing.dept} department)
              <button name={thing.item} onClick={this.deleteItem}>
                X
              </button>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default App;
