import React, { Component } from "react";

class Inventory extends Component {
  constructor(props) {
    super(props);
    this.state = { inventory: [] };
  }

  componentDidMount() {
    fetch("/api/inventory")
      .then((response) => response.json())
      .then((data) => this.setState({ inventory: data }));
  }

  render() {
    const { inventory, isLoading } = this.state;

    if (isLoading) {
      return <p>Caricamento...</p>;
    }

    const itemList = inventory.map((item) => {
      let imagePath = `../../icons/inventory-icons/${item.name}.png`;
      let defaultImage = "../../icons/inventory-icons/sconosciuto.png";
      return (
        <tr key={item.name}>
          <td>
            <img
              className="shoppingImage"
              src={imagePath}
              onError={(e) => { e.target.onerror = null; e.target.src=defaultImage }}
            />
          </td>
          <td>{item.name}</td>
          <td>{item.quantity}</td>
        </tr>
      );
    });

    return (
      <div>
        <table className="myTable">
          <thead>
            <tr>
              <th width="30%">Immagine</th>
              <th width="30%">Nome</th>
              <th width="30%">Quantità</th>
            </tr>
          </thead>
          <tbody>{itemList}</tbody>
        </table>
      </div>
    );
  }
}
export default Inventory;