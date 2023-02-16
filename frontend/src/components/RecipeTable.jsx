import { TextField } from "@mui/material";
import React from "react";
import DedicatedTable from "./DedicatedTable";
import MButton from "./MButton";
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

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
                    <MButton text="Dettagli" onClick={() => this.props.handleView(recipe)} />
                    <MButton text="Esegui" onClick={() => this.props.handleExecute(recipe)} />
                    <MButton text="Modifica" onClick={() => this.props.handleEdit(recipe)} />
                    <MButton text="Elimina" onClick={() => this.props.handleDelete(recipe)} />
                </div>)
            }
        })
        const pivotRow = {
            name: (<TextField label="Recipe Name" value={this.props.newRecipeName} style={{width: "90%", textAlign:"center"}} onChange={ (event) => this.props.setNewRecipeName(event)}/>),
            description: (<TextField multiline label="Recipe Description" value={this.props.newRecipeDescription} style={{width: "90%", textAlign:"center"}} onChange={ (event) => this.props.setNewRecipeDescription(event)}/>),
            toolbox: (<IconButton aria-label="Aggiungi" onClick={() => this.props.addRecipe()}><AddIcon /></IconButton>)
        };

        return <DedicatedTable rows={rows} columns={COLUMNS} pivotRow={pivotRow}/>
    }
}