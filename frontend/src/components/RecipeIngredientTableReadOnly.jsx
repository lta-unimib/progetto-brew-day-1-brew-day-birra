import React from "react";
import DedicatedTable from "./DedicatedTable";

const COLUMNS = [
    {title: "Immagine", key: "icon", sortable: false},
    {title: "Nome", key: "name"},
    {title: "Quantita'", key: "quantity"},
]

export default class RecipeIngredientTableReadOnly extends React.Component {
    render() {
        const rows = this.props.ingredients.map((ingredient) => {
            return {
                icon: (<img
                    className="shoppingImage"
                    src={`../../icons/inventory-icons/${ingredient.name}.png`}
                    alt={ingredient.name}
                    onError={(e) => {
                      e.target.src = "../../icons/inventory-icons/sconosciuto.png";
                    }}
                  />),
                name: ingredient.name,
                quantity: ingredient.quantity
            }
        })
        return <DedicatedTable rows={rows} columns={COLUMNS}/>
    }
}