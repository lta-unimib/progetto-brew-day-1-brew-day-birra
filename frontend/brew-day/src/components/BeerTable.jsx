import React from "react";
import DedicatedTable from "./DedicatedTable";
import MButton from "./MButton";

const COLUMNS = [
    {title: "Nome", key: "name"},
    {title: "Azioni", key: "toolbox"}
]

export default class BeerTable extends React.Component {
    render() {
        const rows = this.props.beers.map((beer) => {
            return {
                name: beer.name,
                toolbox: (<div>
                    <MButton text="Dettagli" onClick={() => this.props.handleView(beer)} />
                    <MButton text="Modifica" onClick={() => this.props.handleEdit(beer)} />
                    <MButton text="Elimina" onClick={() => this.props.handleDelete(beer)} />
                </div>)
            }
        })
        return <DedicatedTable rows={rows} columns={COLUMNS}/>
    }
}