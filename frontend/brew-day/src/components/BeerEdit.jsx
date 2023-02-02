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

  handleNoteTypeChange = (event, index) => {
    const notes = [...this.state.notes];
    notes[index].noteType = event.target.value;
    this.setState({ notes });
  };

  handleDescriptionChange = (event, index) => {
    const notes = [...this.state.notes];
    notes[index].description = event.target.value;
    this.setState({ notes });
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
                <button>Modifica nome</button>
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
                <th>
                  <textarea></textarea>
                </th>
                <th>
                  <textarea className="descriptionBeerEdit"></textarea>
                </th>
                <td>
                  <button>Aggiungi nota</button>
                </td>
              </tr>
            </thead>
            <tbody>
              {this.state.notes.map((note, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <textarea
                        value={note.noteType}
                        onChange={(event) =>
                          this.handleNoteTypeChange(event, index)
                        }
                      />
                    </td>
                    <td>
                      <textarea
                        className="descriptionBeerEdit"
                        value={note.description}
                        onChange={(event) =>
                          this.handleDescriptionChange(event, index)
                        }
                      />
                    </td>
                    <td>
                      <button>Modifica nota</button>
                    </td>
                    <td>
                      <button onClick={() => this.handleDeleteNote(index)}>
                        Elimina nota
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