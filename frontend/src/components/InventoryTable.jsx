import React from "react";
import DedicatedTable from "./DedicatedTable";
import MButton from "./MButton";

const COLUMNS = [
    {title: "Immagine", key: "icon", sortable: false},
    {title: "Nome", key: "name"},
    {title: "Quantita'", key: "quantity"},
    {title: "Azioni", key: "toolbox", sortable: false}
]

export default class InventoryTable extends React.Component {
    render() {
        const rows = this.props.items.map((item) => {
            return {
                icon: (<img
                    className="shoppingImage"
                    src={`../../icons/inventory-icons/${item.name}.png`}
                    alt={item.name}
                    onError={(e) => {
                      e.target.src = "../../icons/inventory-icons/sconosciuto.png";
                    }}
                  />),
                name: item.name,
                quantity: item.quantity,
                toolbox: (<div>
                    <MButton text="Elimina" onClick={() => this.props.handleDelete(item.ingredientID)} />
                </div>)
            }
        })
        return <DedicatedTable rows={rows} columns={COLUMNS}/>
    }
}