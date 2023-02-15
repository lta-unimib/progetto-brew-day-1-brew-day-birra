import React, { Component } from "react";
import {BEERS_ENDPOINT, DEFAULT_NOTE_TYPE, FAKE_NOTIFIER} from '../utils/Protocol';
import BeerNoteTable from "./BeerNoteTable";
import InputFieldSetting from "./InputFieldSetting";


class BeerEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [], name: "",
      noteType: DEFAULT_NOTE_TYPE, description: ""
    };
    this.notifier = this.props.notifier || FAKE_NOTIFIER;
  }

  triggerReload = () => {
    fetch(BEERS_ENDPOINT + `${this.props.beerID}`)
    .then(response => response.json())
    .then(data => {
      this.setState({...data, noteType: DEFAULT_NOTE_TYPE, description: ""});
    })
    .catch(this.notifier.connectionError);
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
    .then(this.notifier.onRequestError("impossibile eliminare la nota"))
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
    .then(this.notifier.onRequestSuccess("nome modificato correttamente"))
    .then(this.notifier.onRequestError("impossibile cambiare il nome"))
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
    .then(this.notifier.onRequestError("impossibile aggiungere la nota"))
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
    .then(this.notifier.onRequestError("impossibile aggiornare la nota"))
    .then(() => this.triggerReload());
  };

  render() {
    return (
        <div>
          <center>
            <InputFieldSetting
              id="inputBeerEdit"
              data-testid="inputBeerEdit"
              value={this.state.name}
              onChange={this.handleInputChange}
              onConfirm={this.handleNameChange}
            />
            <BeerNoteTable
              notes={this.state.notes}
              newNoteType={this.state.noteType}
              newDescription={this.state.description}
              setNewNoteType={(event) => this.setState({noteType: event.target.value})}
              setNewDescription={(event) => this.setState({description: event.target.value})}
              editNote={this.handleEditNote}
              deleteNote={this.handleDeleteNote}
              handleNoteTypeChange={this.handleNoteTypeChange}
              handleDescriptionChange={this.handleDescriptionChange}
              addNote={() => this.handleAddNote(this.state.noteType, this.state.description)}
            />
          </center>
        </div>
    );
  }
}

export default BeerEdit;
