import React, { Component } from "react";

class BeerEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: props.notes || [],
      name: props.name || ""
    };
  }

  handleInputChange = (event) => {
    this.setState({
      name: event.target.value
    });
  };

  render() {
    return (
      <div>
        <center>
          <table>
            <tr>
              <th width="33%">
                <p>Nome birra:</p>
              </th>
              <th width="33%">
                <input id="inputBeerEdit" value={this.state.name} onChange={this.handleInputChange} />
              </th>
              <th width="33%">
                <button>Conferma nome</button>
              </th>
            </tr>
          </table>
          <h4>Note:</h4>
          <table className="myTable">
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Descrizione</th>
              </tr>
            </thead>
            <tbody>
              {this.state.notes.map((note) => {
                return (
                  <tr>
                    <td><textarea value={note.noteType}></textarea></td>
                    <td><textarea value={note.description}></textarea></td>
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