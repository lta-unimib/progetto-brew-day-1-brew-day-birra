import React from "react";
import DedicatedTable from "./DedicatedTable";
import IngredientNameInput from "./IngredientNameInput";
import QuantityInput from "./QuantityInput";
import IconButton from '@mui/material/IconButton';
import { Tooltip } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

const COLUMNS = [
    {title: "Nome", key: "name"},
    {title: "Quantita'", key: "quantity"},
    {title: "Azioni", key: "toolbox", sortable: false}
]

export default class ShoppingIngredientTable extends React.Component {
    render() {
        const rows = this.props.ingredients.map((ingredient) => {
            return {
                key: ingredient.name,
                name: ingredient.name,
                quantity: (<QuantityInput label="Quantity" value={ingredient.quantity} onChange={(event) => this.props.editQuantity(ingredient.name, event)}/>),
                toolbox: (<div>
                    <Tooltip title="Elimina">
                        <IconButton aria-label="Elimina" onClick={() => this.props.deleteIngredient(ingredient.name)}>
                            <RemoveShoppingCartIcon />
                        </IconButton>
                    </Tooltip>
                </div>)
            }
        })
        const pivotRow = {
            key: "",
            name: (<IngredientNameInput value={this.props.newIngredientName} onChange={this.props.setNewIngredientName}/>),
            quantity: (<QuantityInput label="Quantity" value={this.props.newIngredientQuantity} onChange={this.props.setNewIngredientQuantity}/>),
            toolbox: (<Tooltip title="Aggiungi">
                        <IconButton aria-label="Aggiungi" onClick={() => this.props.addIngredient()}>
                            <AddShoppingCartIcon />
                        </IconButton>
                    </Tooltip>)
        };

        return <DedicatedTable rows={rows} columns={COLUMNS} pivotRow={pivotRow}/>
    }
}