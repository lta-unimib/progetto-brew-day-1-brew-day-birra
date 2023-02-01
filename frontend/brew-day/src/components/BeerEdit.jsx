import React, { Component } from "react";

class BeerEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: props.notes || [],
    };
  }

  render() {
    return (
      <div>
        <center>
          <h4 id="BeerEditH4">Nome</h4>
          <input type="text"></input>
          <h4>Note:</h4>
          <table className="myTable">
            <thead>
              <tr>
                <th>Type</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {this.state.notes.map((note) => {
                return (
                  <tr>
                    <td>{note.noteType}</td>
                    <td>{note.description}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </center>
      </div>
    );
  }
}

export default BeerEdit;
