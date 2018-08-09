import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buyItems: ["milk", "bread", "fruit"],
      message: ""
    };
  }

  // preventDefault prevents the form from the default, which is refreshing the page. and we'll add that e blow to the form submit button
  addItem(e) {
    e.preventDefault();
    const { buyItems } = this.state;
    // we want this to be dynamic from the input value.
    const newItem = this.newItem.value;
    const isOnTheList = buyItems.includes(newItem);

    if (isOnTheList) {
      this.setState({
        message: "This item is already on the list."
      });
    } else {
      //  if input is empty, don't allow.
      newItem !== "" &&
        this.setState({
          // this will be an object that will overwrite our current state. The ... selects all, it is the property spread notation. and then add to the end of it with newitem.
          buyItems: [...this.state.buyItems, newItem],
          message: "",
          clear: ""
        });
    }

    // this resets the form after we add the item
    this.addForm.reset();
  }

  removeItem(item) {
    // getting old state, filtering it, comparing and removing the items !== to item
    const newBuyItems = this.state.buyItems.filter(buyItem => {
      return buyItem !== item;
    });

    this.setState({
      buyItems: [...newBuyItems]
    });

    if (newBuyItems.length === 0) {
      this.setState({
        message: "No items on your list, add some."
        // now we only want to render the table if something is in it.
      });
    }
  }

  // to clear all just set state to buyItems: [].
  clearAll() {
    this.setState({
      buyItems: [],
      message: "No items on your list, add some."
    });
  }

  render() {
    // destructuring here allowed us to not say this.state.buyItems.map below...
    const { buyItems, message } = this.state;
    return (
      <div>
        <header className="headerTop">
          <img
            src="http://icons.iconarchive.com/icons/iconsmind/outline/256/Shopping-Cart-icon.png"
            alt=""
          />
          <h1>Shopping List</h1>

          <form
            ref={input => (this.addForm = input)}
            className="form-inline"
            onSubmit={e => {
              this.addItem(e);
            }}
          >
            <div className="form-group">
              <label className="sr-only" htmlFor="newItemInput">
                Add New Item
              </label>

              {/* ref allows us to reference something later. */}
              <input
                ref={input => (this.newItem = input)}
                type="text"
                placeholder="Bread"
                className="form-control"
                id="newItemInput"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </form>
        </header>

        <div className="panel panel-default">
          {/* 2 conditions, this will print out when same item typed in. Destructure it above with buyItems. and if buyItems.length is === 0*/}
          {(message !== "" || buyItems.length === 0) && (
            <p className="message text-danger">{message}</p>
          )}
          {/* this makes it so that the table only renders if something is in it. if buyItems are greater than 0 and ... */}
          {buyItems.length > 0 && (
            <table className="table table-sm ">
              <caption> Shopping List</caption>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Item</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {buyItems.map(item => {
                  return (
                    <tr key={item}>
                      <th scope="row">1</th>
                      <td>{item}</td>
                      <td className="text-right">
                        <button
                          onClick={e => this.removeItem(item)}
                          type="button"
                          className="btn btn-default btn-sm"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="2">&nbsp;</td>
                  <td className="text-right">
                    <button
                      className="btn btn-default btn-sm"
                      onClick={e => this.clearAll()}
                    >
                      Clear list
                    </button>
                  </td>
                </tr>
              </tfoot>
            </table>
          )}
        </div>
      </div>
    );
  }
}

export default App;
