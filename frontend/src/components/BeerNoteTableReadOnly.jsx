import React from "react";
import { NOTE_TYPE_ICONS } from "../Protocol";
import DedicatedTable from "./DedicatedTable";

const COLUMNS = [
    {title: "Tipo", key: "noteType"},
    {title: "Descrizione'", key: "description"},
]

export default class BeerNoteTableReadOnly extends React.Component {
    render() {
        const rows = this.props.notes.map((note) => {
            return {
                noteType: NOTE_TYPE_ICONS[note.noteType],
                description: note.description
            }
        })
        return <DedicatedTable rows={rows} columns={COLUMNS}/>
    }
}