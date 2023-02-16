import { TextField } from "@mui/material";
import React from "react";
import DedicatedTable from "./DedicatedTable";
import MButton from "./MButton";
import NoteTypeInput from "./NoteTypeInput";
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';

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
                    <IconButton aria-label="V" onClick={() => this.props.editNote(note)}><DoneIcon /></IconButton>
                    <MButton text="X" onClick={() => this.props.deleteNote(note)} />
                </div>)
            }
        })
        const pivotRow = {
            noteType: (<NoteTypeInput value={this.props.newNoteType} onChange={this.props.setNewNoteType}/>),
            description: (<TextField multiline sx={{width:"90%"}} value={this.props.newDescription} data-testid="note-type-textarea" onChange={this.props.setNewDescription}/>),
            toolbox: (<IconButton aria-label="Aggiungi" onClick={this.props.addNote}><AddIcon /></IconButton>)
        };

        return <DedicatedTable rows={rows} columns={COLUMNS} pivotRow={pivotRow}/>
    }
}