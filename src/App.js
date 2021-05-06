import React from "react";
import axios from "axios";
import Forms from "./Forms";
import GroceryList from "./GroceryList";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groceryList: [],
      sortedList: [],
      sorted: false,
      itemForm: "",
      userForm: "",
      department: "Misc",
    };
    this.handleChange = this.handleChange.bind(this);
    this.postItem = this.postItem.bind(this);
    this.getList = this.getList.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.sortItems = this.sortItems.bind(this);
    this.toggleSort = this.toggleSort.bind(this);
  }
  toggleSort() {
    this.setState({ sorted: !this.state.sorted });
    this.getList();
  }
  getList(e) {
    if (e) {
      e.preventDefault();
    }
    let getObj = {
      method: "get",
      url: `/list/${this.state.userForm}`,
    };
    axios(getObj)
      .then((response) => {
        console.log(response.data);
        const stringList = response.data;
        const objList = [];
        if (stringList.length > 0) {
          stringList.forEach((string) => {
            let split = string.split("-");
            objList.push({ item: split[0], dept: split[1] });
          });
        }
        this.setState({ groceryList: objList, userForm: "" });
        this.sortItems();
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
        this.getList();
      })
      .catch((err) => {
        console.error(err);
      });
  }
  sortItems() {
    const unsortedItems = this.state.groceryList;
    const sortedItems = unsortedItems.sort((a, b) => {
      var textA = a.dept;
      var textB = b.dept;
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });
    this.setState({ sortedList: sortedItems });
  }
  render() {
    let isSorted = this.state.sorted;
    let list;
    if (isSorted) {
      list = this.state.sortedList;
    } else {
      list = this.state.groceryList;
    }
    return (
      <div className="app">
        <h1>
          Supermarket
          <br /> Schweep
        </h1>
        <Forms
          getList={this.getList}
          postItem={this.postItem}
          userForm={this.state.userForm}
          itemForm={this.state.itemForm}
          department={this.state.department}
          handleChange={this.handleChange}
        />
        <GroceryList
          getList={this.getList}
          toggleSort={this.toggleSort}
          list={list}
          deleteItem={this.deleteItem}
        />
      </div>
    );
  }
}

export default App;
