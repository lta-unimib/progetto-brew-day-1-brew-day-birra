import React, { Component } from "react";
import MButton from '../components/MButton';
import {BEERS_ENDPOINT} from '../Protocol';


class BeerEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [], name: "",
      noteType: "", description: ""
    };
  }

  triggerReload = () => {
    fetch(BEERS_ENDPOINT + `${this.props.beerID}`)
    .then(response => response.json())
    .then(data => {
      this.setState({...data, noteType: "", description: ""});
    })
  }

  componentDidMount() {
    this.triggerReload();
  }

  handleInputChange = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  handleDeleteNote = (note) => {
    const { beerID, noteID } = note;
    fetch(BEERS_ENDPOINT + `${beerID}/${noteID}`, {
      method: "DELETE",
    })
    .then(() => this.triggerReload());
  };

  handleNoteTypeChange = (event, note) => {
    const notes = this.state.notes;
    const i = notes.findIndex((n) => n.noteID === note.noteID);
    notes[i].noteType = event.target.value;
    this.setState({ notes });
  };

  handleDescriptionChange = (event, note) => {
    const notes = this.state.notes;
    const i = notes.findIndex((n) => n.noteID === note.noteID);
    notes[i].description = event.target.value;
    this.setState({ notes });
  };

  handleNameChange = () => {
    const { beerID } = this.props;
    const { name } = this.state;

    fetch(BEERS_ENDPOINT + `${beerID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    })
    .then(() => this.triggerReload())
    .then(() => this.props.onConfirm())
  };

  handleAddNote = (noteType, description) => {
    const { beerID } = this.props;

    fetch(BEERS_ENDPOINT + `${beerID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description: description, noteType: noteType }),
    })
    .then(() => this.triggerReload());
  };

  handleEditNote = (note) => {
    const { beerID, description, noteType, noteID } = note;

    fetch(BEERS_ENDPOINT + `${beerID}/${noteID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description, noteType }),
    })
    .then(() => this.triggerReload());
  };

  render() {
    return (
        <div>
          <center>
            <table>
              <tbody>
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
                    <MButton text="V" onClick={this.handleNameChange} />
                  </th>
                </tr>
              </tbody>
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
                    <textarea value={this.state.noteType}
                      data-testid="note-type-textarea"
                      onChange={(event) => this.setState({noteType: event.target.value})}
                    ></textarea>
                  </th>
                  <th>
                    <textarea value={this.state.description}
                      data-testid="description-textarea"
                      onChange={(event) =>
                        this.setState({description: event.target.value})
                      }
                      className="descriptionBeerEdit"
                    ></textarea>
                  </th>
                  <td>
                    <MButton text="V" onClick={() => this.handleAddNote(this.state.noteType, this.state.description)} />
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
                        <MButton text="V" onClick={() => this.handleEditNote(note)} />
                      </td>
                      <td>
                        <MButton text="X" onClick={() => this.handleDeleteNote(note)} />
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
