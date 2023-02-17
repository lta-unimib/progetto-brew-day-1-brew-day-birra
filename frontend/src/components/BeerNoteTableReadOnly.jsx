import React from "react";
import { NOTE_TYPE_ICONS } from "../utils/Protocol";
import DedicatedTable from "./DedicatedTable";

const COLUMNS = [
    {title: "Tipo", key: "noteType"},
    {title: "Descrizione'", key: "description"},
]

export default class BeerNoteTableReadOnly extends React.Component {
    render() {
        const rows = this.props.notes.map((note) => {
            return {
                key: note.noteID,
                noteType: (<p style={{textAlign:"center", fontStyle: "italic", fontSize: 20, vertialAlign: "center", wordSpacing: 10}}>{NOTE_TYPE_ICONS[note.noteType]} {note.noteType}</p>),
                description: note.description
            }
        })
        return <DedicatedTable rows={rows} columns={COLUMNS}/>
    }
}
