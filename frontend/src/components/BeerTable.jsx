import React from "react";
import DedicatedTable from "./DedicatedTable";
import MButton from "./MButton";
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';

const COLUMNS = [
    {title: "Nome", key: "name"},
    {title: "Azioni", key: "toolbox", sortable: false}
]

export default class BeerTable extends React.Component {
    render() {
        const rows = this.props.beers.map((beer) => {
            return {
                name: beer.name,
                toolbox: (<div>
                    <IconButton aria-label="Dettagli" onClick={() => this.props.handleView(beer)}><VisibilityIcon /></IconButton>
                    <MButton text="Modifica" onClick={() => this.props.handleEdit(beer)} />
                    <MButton text="Elimina" onClick={() => this.props.handleDelete(beer)} />
                </div>)
            }
        })
        return <DedicatedTable rows={rows} columns={COLUMNS}/>
    }
}