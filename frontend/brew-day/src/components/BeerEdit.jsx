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

  handleDeleteNote = (index, note) => {
    fetch(`/api/beer/${note.beerID}/${note.noteID}`, {
      method: "DELETE"
    });
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

  handleNameChange = () => {
    const { beerID } = this.props;
    const { name } = this.state;

    fetch(`/api/beer/${beerID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  handleAddNote = (noteType, description) => {
    const { beerID } = this.props;

    fetch(`/api/beer/${beerID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description: description, noteType: noteType }),
    }).catch((error) => {
      console.error(error);
    });
  };

  handleEditNote = (note, index) => {
    const { beerID } = this.props;
    const { description, noteType } = note;
  
    fetch(`/api/beer/${beerID}/${note.noteID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description, noteType }),
    })
      .catch((error) => {
        console.error(error);
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
                  data-testid="inputBeerEdit"
                  value={this.state.name}
                  onChange={this.handleInputChange}
                />
              </th>
              <th width="33%">
                <button onClick={this.handleNameChange}>Modifica nome</button>
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
                  <textarea
                    onChange={(event) => (this.noteType = event.target.value)}
                  ></textarea>
                </th>
                <th>
                  <textarea
                    onChange={(event) =>
                      (this.description = event.target.value)
                    }
                    className="descriptionBeerEdit"
                  ></textarea>
                </th>
                <td>
                  <button
                    onClick={() =>
                      this.handleAddNote(this.noteType, this.description)
                    }
                  >
                    Aggiungi nota
                  </button>
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
                        data-testid="note-type-textarea"
                        onChange={(event) =>
                          this.handleNoteTypeChange(event, index)
                        }
                      />
                    </td>
                    <td>
                      <textarea
                        className="descriptionBeerEdit"
                        data-testid="description-textarea"
                        value={note.description}
                        onChange={(event) =>
                          this.handleDescriptionChange(event, index)
                        }
                      />
                    </td>
                    <td>
                      <button onClick={() => this.handleEditNote(note, index)}>
                        Modifica nota
                      </button>
                    </td>
                    <td>
                      <button onClick={() => this.handleDeleteNote(index, note)}>
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