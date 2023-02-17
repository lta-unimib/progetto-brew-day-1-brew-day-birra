import { TextField, Tooltip } from "@mui/material";
import React from "react";
import DedicatedTable from "./DedicatedTable";
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CoffeeMakerIcon from '@mui/icons-material/CoffeeMaker';

const COLUMNS = [
    {title: "Nome", key: "name"},
    {title: "Descrizione", key: "description"},
    {title: "Azioni", key: "toolbox", sortable: false}
]

export default class RecipeTable extends React.Component {
    render() {
        const rows = this.props.recipes.map((recipe) => {
            return {
                name: recipe.name,
                description: recipe.description,
                toolbox: (<div>
                    <Tooltip title="Dettagli">
                        <IconButton aria-label="Dettagli" onClick={() => this.props.handleView(recipe)}>
                            <VisibilityIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Esegui">
                        <IconButton aria-label="Esegui" onClick={() => this.props.handleExecute(recipe)}>
                            <CoffeeMakerIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Modifica">
                        <IconButton aria-label="Modifica" onClick={() => this.props.handleEdit(recipe)}>
                            <EditIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Elimina">
                        <IconButton aria-label="Elimina" onClick={() => this.props.handleDelete(recipe)}>
                            <DeleteIcon/>
                        </IconButton>
                    </Tooltip>
                </div>)
            }
        })
        const pivotRow = {
            name: (<TextField label="Recipe Name" value={this.props.newRecipeName} style={{width: "90%", textAlign:"center"}} onChange={ (event) => this.props.setNewRecipeName(event)}/>),
            description: (<TextField multiline label="Recipe Description" value={this.props.newRecipeDescription} style={{width: "90%", textAlign:"center"}} onChange={ (event) => this.props.setNewRecipeDescription(event)}/>),
            toolbox: (<Tooltip title="Aggiungi">
                        <IconButton aria-label="Aggiungi" onClick={() => this.props.addRecipe()}>
                            <AddIcon />
                        </IconButton>
                    </Tooltip>)
        };

        return <DedicatedTable rows={rows} columns={COLUMNS} pivotRow={pivotRow}/>
    }
}