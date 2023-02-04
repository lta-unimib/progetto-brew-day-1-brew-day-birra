import React, { Component } from "react";
import { Button, ThemeProvider } from "@mui/material";
import theme from "../theme/theme";
import IngredientDelete from "../components/IngredientDelete";
import Modal from "../components/Modal";

class Inventario extends Component {
  constructor(props) {
    super(props);
    this.state = { inventory: [], isLoading: true, showModal: false, ingredientID: null };
  }

  componentDidMount() {
    fetch("/api/inventory")
      .then((response) => response.json())
      .then((data) => this.setState({ inventory: data, isLoading: false }, () => {
        return <p>Caricamento...</p>
      }));
  }

  setShowModal = () => {
    this.setState({ showModal: false });
  };

  handleDelete(ingredientID) {
    this.setState({
      showModal: true,
      ingredientID
    });
  }

  handleDeleteConfirm = () => {
    const { ingredientID } = this.state;
    fetch(`/api/inventory/${ingredientID}`, {
      method: "DELETE"
    }).then(() => {
      this.setState({
        inventory: this.state.inventory.filter(item => item.ingredientID !== ingredientID),
        showModal: false
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
        <tr key={item.ingredientID}>
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
            <Button style={{ marginRight: 10, marginTop: 10, marginBottom: 10 }} 
                    variant="contained" color="primary" 
                    onClick={() => this.handleDelete(item.ingredientID)}>
              Elimina ingrediente
            </Button>
          </td>
        </tr>
      );
    });

    return (
      <ThemeProvider theme={theme}>
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
          <Modal
            showModal={this.state.showModal}
            setShowModal={this.setShowModal}
          >
            <IngredientDelete onConfirm={this.handleDeleteConfirm}/>
          </Modal>
        </div>
      </ThemeProvider>
    );
  }
}
export default Inventario;
