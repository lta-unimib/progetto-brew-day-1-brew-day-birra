import React, { Component } from "react";

class Inventario extends Component {
  constructor(props) {
    super(props);
    this.state = { inventory: [], isLoading: true};
  }

  componentDidMount() {
    fetch("/api/inventory")
      .then((response) => response.json())
      .then((data) => this.setState({ inventory: data, isLoading: false }, () => {
        return <p>Caricamento...</p>
      }));
  }

  handleDelete = (name) => {
    fetch(`/api/inventory/${name}`, {
      method: "DELETE"
    }).then(() => {
      this.setState({
        inventory: this.state.inventory.filter(item => item.name !== name)
      });
    });
  };

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
              alt = ""
              onError={(e) => { e.target.onerror = null; e.target.src=defaultImage }}
            />
          </td>
          <td>{item.name}</td>
          <td>{item.quantity}</td>
          <td>
            <button onClick={() => this.handleDelete(item.name)}>
              Elimina ingrediente
            </button>
          </td>
        </tr>
      );
    });

    return (
      <div>
        <table className="myTable">
          <thead>
            <tr>
              <th width="25%">Immagine</th>
              <th width="25%">Nome</th>
              <th width="25%">Quantità</th>
              <th width="25%">Azioni</th>
            </tr>
          </thead>
          <tbody>{itemList}</tbody>
        </table>
      </div>
    );
  }
}
export default Inventario;
