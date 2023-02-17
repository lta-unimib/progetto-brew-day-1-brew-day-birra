import React from "react";
import DedicatedTable from "./DedicatedTable";
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Tooltip } from "@mui/material";

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
                    <Tooltip title="Dettagli">
                        <IconButton aria-label="Dettagli" onClick={() => this.props.handleView(beer)}>
                            <VisibilityIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Modifica">
                        <IconButton aria-label="Modifica" onClick={() => this.props.handleEdit(beer)}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Elimina">
                        <IconButton aria-label="Elimina" onClick={() => this.props.handleDelete(beer)}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </div>)
            }
        })
        return <DedicatedTable rows={rows} columns={COLUMNS}/>
    }
}