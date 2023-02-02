import React, { Component } from "react";

class BeerEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: props.notes || [],
      name: props.name || "",
    };
  }

  handleInputChange = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  handleDeleteNote = (index) => {
    this.setState({
      notes: this.state.notes.filter((note, i) => i !== index),
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
                <input
                  id="inputBeerEdit"
                  value={this.state.name}
                  onChange={this.handleInputChange}
                />
              </th>
              <th width="33%">
                <button>Modifica Nome</button>
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
              <tr>
                <th><textarea></textarea></th>
                <th><textarea className="descriptionBeerEdit"></textarea></th>
                <td><button>Aggiungi Nota</button></td>
              </tr>
            </thead>
            <tbody>
              {this.state.notes.map((note, index) => {
                return (
                  <tr key={note.nodeID}>
                    <td>
                      <textarea value={note.noteType}></textarea>
                    </td>
                    <td>
                      <textarea
                        className="descriptionBeerEdit"
                        value={note.description}
                      ></textarea>
                    </td>
                    <td>
                      <button>Modifica Nota</button>
                    </td>
                    <td>
                      <button onClick={() => this.handleDeleteNote(index)}>
                        Elimina Nota
                      </button>
                    </td>
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
