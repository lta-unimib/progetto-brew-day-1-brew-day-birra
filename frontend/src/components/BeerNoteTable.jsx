import { TextField } from "@mui/material";
import React from "react";
import DedicatedTable from "./DedicatedTable";
import MButton from "./MButton";
import NoteTypeInput from "./NoteTypeInput";

const COLUMNS = [
    {title: "Tipo", key: "noteType"},
    {title: "Descrizione'", key: "description"},
    {title: "Azioni", key: "toolbox", sortable: false}
]

export default class BeerNoteTable extends React.Component {
    render() {
        const rows = this.props.notes.map((note) => {
            return {
                noteType: (<NoteTypeInput value={note.noteType} onChange={(event) => this.props.handleNoteTypeChange(event, note)}/>),
                description: (<TextField multiline sx={{width:"90%"}} value={note.description} data-testid="note-type-textarea" onChange={(event) => this.props.handleDescriptionChange(event, note)}/>),
                toolbox: (<div>
                    <MButton text="V" onClick={() => this.props.editNote(note)} />
                    <MButton text="X" onClick={() => this.props.deleteNote(note)} />
                </div>)
            }
        })
        const pivotRow = {
            noteType: (<NoteTypeInput value={this.props.newNoteType} onChange={this.props.setNewNoteType}/>),
            description: (<TextField multiline sx={{width:"90%"}} value={this.props.newDescription} data-testid="note-type-textarea" onChange={this.props.setNewDescription}/>),
            toolbox: (<MButton text="Aggiungi" onClick={this.props.addNote} />)
        };

        return <DedicatedTable rows={rows} columns={COLUMNS} pivotRow={pivotRow}/>
    }
}