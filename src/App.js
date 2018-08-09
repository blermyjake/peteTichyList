import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buyItems: ["milk", "bread", "fruit"]
    };
  }

  // preventDefault prevents the form from the default, which is refreshing the page. and we'll add that e blow to the form submit button
  addItem(e) {
    e.preventDefault();
    const { buyItems } = this.state;
    // we want this to be dynamic from the input value.
    const newItem = this.newItem.value;

    // this will be an object that will overwrite our current state. The ... selects all, it is the property spread notation. and then add to the end of it with newitem.
    this.setState({
      buyItems: [...this.state.buyItems, newItem]
    });
    // this resets the form after we add the item
    this.addForm.reset();
  }

  render() {
    // destructuring here allowed us to not say this.state.buyItems.map below...
    const { buyItems } = this.state;
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
                    <td>Button</td>
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
