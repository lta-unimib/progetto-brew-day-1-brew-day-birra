import React from "react";
import DedicatedTable from "./DedicatedTable";
import IngredientNameInput from "./IngredientNameInput";
import MButton from "./MButton";
import QuantityInput from "./QuantityInput";
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

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
                quantity: (<QuantityInput label="Ingredient Quantity" value={ingredient.quantity} onChange={(event) => this.props.setQuantity(ingredient.ingredientID, event)}/>),
                toolbox: (<div>
                    <MButton text="V" onClick={() => this.props.editQuantity(ingredient.ingredientID)} />
                    <MButton text="X" onClick={() => this.props.deleteIngredient(ingredient.ingredientID)} />
                </div>)
            }
        })
        const pivotRow = {
            name: (<IngredientNameInput value={this.props.newIngredientName} onChange={this.props.setNewIngredientName}/>),
            quantity: (<QuantityInput label="Ingredient Quantity" value={this.props.newIngredientQuantity} onChange={this.props.setNewIngredientQuantity}/>),
            toolbox: (<IconButton aria-label="Aggiungi" onClick={() => this.props.addIngredient()}><AddIcon /></IconButton>)
        };

        return <DedicatedTable rows={rows} columns={COLUMNS} pivotRow={pivotRow}/>
    }
}