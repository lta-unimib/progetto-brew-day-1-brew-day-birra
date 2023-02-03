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

  handleDeleteNote = (note) => {
    const { beerID, noteID } = note;
    fetch(`/api/beer/${beerID}/${noteID}`, {
      method: "DELETE",
    });
    this.setState({
      notes: this.state.notes.filter((n) => n.noteID !== noteID),
    });
  };

  handleNoteTypeChange = (event, note) => {
    const notes = this.state.notes;
    const i = notes.findIndex(n => n.noteID === note.noteID);
    notes[i].noteType = event.target.value;
    this.setState({ notes });
  };

  handleDescriptionChange = (event, note) => {
    const notes = this.state.notes;
    const i = notes.findIndex(n => n.noteID === note.noteID);
    notes[i].description = event.target.value;
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

  handleEditNote = (note) => {
    const { beerID, description, noteType, noteID } = note;

    fetch(`/api/beer/${beerID}/${noteID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description, noteType }),
    }).catch((error) => {
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
              {this.state.notes.map((note) => {
                return (
                  <tr key={note.noteID}>
                    <td>
                      <textarea
                        value={note.noteType}
                        data-testid="note-type-textarea"
                        onChange={(event) =>
                          this.handleNoteTypeChange(event, note)
                        }
                      />
                    </td>
                    <td>
                      <textarea
                        className="descriptionBeerEdit"
                        data-testid="description-textarea"
                        value={note.description}
                        onChange={(event) =>
                          this.handleDescriptionChange(event, note)
                        }
                      />
                    </td>
                    <td>
                      <button onClick={() => this.handleEditNote(note)}>
                        Modifica nota
                      </button>
                    </td>
                    <td>
                      <button onClick={() => this.handleDeleteNote(note)}>
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
