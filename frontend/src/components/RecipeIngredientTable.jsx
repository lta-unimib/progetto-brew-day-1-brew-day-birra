import React from "react";
import DedicatedTable from "./DedicatedTable";
import IngredientNameInput from "./IngredientNameInput";
import QuantityInput from "./QuantityInput";
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import { Tooltip } from "@mui/material";

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
                    <Tooltip title="Aggiorna">
                        <IconButton aria-label="V" onClick={() => this.props.editQuantity(ingredient.ingredientID)}>
                            <DoneIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Elimina">
                        <IconButton aria-label="X" onClick={() => this.props.deleteIngredient(ingredient.ingredientID)}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </div>)
            }
        })
        const pivotRow = {
            name: (<IngredientNameInput value={this.props.newIngredientName} onChange={this.props.setNewIngredientName}/>),
            quantity: (<QuantityInput label="Ingredient Quantity" value={this.props.newIngredientQuantity} onChange={this.props.setNewIngredientQuantity}/>),
            toolbox: (<Tooltip title="Aggiungi">
                        <IconButton aria-label="Aggiungi" onClick={() => this.props.addIngredient()}>
                            <AddIcon />
                        </IconButton>
                    </Tooltip>)
        };

        return <DedicatedTable rows={rows} columns={COLUMNS} pivotRow={pivotRow}/>
    }
}