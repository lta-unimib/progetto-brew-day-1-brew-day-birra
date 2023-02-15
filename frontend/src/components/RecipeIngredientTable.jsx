import React from "react";
import DedicatedTable from "./DedicatedTable";
import IngredientNameInput from "./IngredientNameInput";
import MButton from "./MButton";
import QuantityInput from "./QuantityInput";

const COLUMNS = [
    {title: "Nome", key: "name"},
    {title: "Quantita'", key: "quantity"},
    {title: "Azioni", key: "toolbox", sortable: false}
]

export default class RecipeIngredientTable extends React.Component {
    render() {
        const rows = this.props.ingredients.map((ingredient) => {
            return {
                name: ingredient.name,
                quantity: (<QuantityInput value={ingredient.quantity} onChange={(event) => this.props.setQuantity(ingredient.ingredientID, event)}/>),
                toolbox: (<div>
                    <MButton text="V" onClick={() => this.props.editQuantity(ingredient.ingredientID)} />
                    <MButton text="X" onClick={() => this.props.deleteIngredient(ingredient.ingredientID)} />
                </div>)
            }
        })
        const pivotRow = {
            name: (<IngredientNameInput value={this.props.newIngredientName} onChange={this.props.setNewIngredientName}/>),
            quantity: (<QuantityInput value={this.props.newIngredientQuantity} onChange={this.props.setNewIngredientQuantity}/>),
            toolbox: (<MButton text="Aggiungi" onClick={() => this.props.addIngredient()} />)
        };

        return <DedicatedTable rows={rows} columns={COLUMNS} pivotRow={pivotRow}/>
    }
}