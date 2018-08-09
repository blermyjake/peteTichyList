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
          message: ""
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
  }

  render() {
    // destructuring here allowed us to not say this.state.buyItems.map below...
    const { buyItems, message } = this.state;
    return (
      <div>
        <header>
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

        <div className="content">
          {/* this will print out when same item typed in. Destructure it aboce with buyItems. */}
          {message !== "" && <p className="message text-danger">{message}</p>}
          <table className="table">
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
          </table>
        </div>
      </div>
    );
  }
}

export default App;
