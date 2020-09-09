import React from "react";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemForm: "",
      groceryList: [],
      userForm: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.postItem = this.postItem.bind(this);
    this.getList = this.getList.bind(this);
  }
  // componentDidMount() {
  //   this.getList();
  // }
  getList(e) {
    e.preventDefault();
    console.log("triggered getList");
    let getObj = {
      method: "get",
      url: `/list/${this.state.userForm}`,
    };
    axios(getObj)
      .then((response) => {
        console.log(response.data);
        this.setState({ groceryList: response.data });
      })
      .catch((err) => {
        console.error(err);
      });
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  postItem(e, owner = "matt") {
    let postObj = {
      method: "post",
      url: `/list/${owner}`,
      data: { item: this.state.itemForm },
    };
    axios(postObj)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
    e.preventDefault();
  }
  render() {
    return (
      <>
        <h1>Supermarket Schweep</h1>
        <h2>Access Your List</h2>
        <form onSubmit={this.getList}>
          <label>
            Enter Your Name:
            <input type="text" name="userForm" value={this.state.userForm} onChange={this.handleChange}></input>
          </label>
          <input type="submit" value="Submit"></input>
        </form>
        <br/>
        <form onSubmit={this.postItem}>
          <label>
            Add To Your List:
            <input
              type="text"
              name="itemForm"
              value={this.state.inputText}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit"></input>
        </form>
        <h2>Your List</h2>
        <ul>
          {this.state.groceryList.map((thing, i) => (
            <li key={i}>{thing}</li>
          ))}
        </ul>
      </>
    );
  }
}

export default App;
