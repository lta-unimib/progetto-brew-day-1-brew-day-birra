import React from "react";
import DedicatedTable from "./DedicatedTable";
import MButton from "./MButton";

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
            name: (<input value={this.props.newRecipeName} type="text" style={{width: "90%", textAlign:"center"}} onChange={ (event) => this.props.setNewRecipeName(event)}></input>),
            description: (<input value={this.props.newRecipeDescription} type="text" style={{width: "90%", textAlign:"center"}} onChange={ (event) => this.props.setNewRecipeDescription(event)}></input>),
            toolbox: (<MButton text="Aggiungi" onClick={() => this.props.addRecipe()} />)
        };

        return <DedicatedTable rows={rows} columns={COLUMNS} pivotRow={pivotRow}/>
    }
}