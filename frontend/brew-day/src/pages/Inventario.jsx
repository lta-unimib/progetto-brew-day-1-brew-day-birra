import React, { Component } from "react";
import MButton from '../components/MButton';
import IngredientDelete from "../components/IngredientDelete";
import Modal from "../components/Modal";
import {INVENTORY_LIST_ENDPOINT, INVENTORY_ENDPOINT} from '../Protocol';
import ThemeManager from "../components/ThemeManager";

class Inventario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inventory: [],
      isLoading: true,
      showModal: false,
      ingredientID: null,
    };
  }

  triggerReload = () => {
    fetch(INVENTORY_LIST_ENDPOINT)
    .then((response) => response.json())
    .then((data) => {
      this.setState({ inventory: data, isLoading: false }, () => {
        return <p>Caricamento...</p>;
      });
    });
  }

  componentDidMount() {
    this.triggerReload();
  }

  setShowModal = (value) => {
    this.setState({ showModal: value });
  };

  handleDelete(ingredientID) {
    this.setState({
      showModal: true,
      ingredientID,
    });
  }

  handleDeleteConfirm = () => {
    const { ingredientID } = this.state;
    fetch(INVENTORY_ENDPOINT+`${ingredientID}`, {
      method: "DELETE",
    }).then(() => {
      this.setState({showModal: false,});
      this.triggerReload();
    });
  };

  render() {
    const { inventory, isLoading } = this.state;

    if (isLoading) {
      return <p>Caricamento...</p>;
    }

    const itemList = inventory.map((item) => {
      return (
        <tr key={item.ingredientID}>
          <td>
            <img
              className="shoppingImage"
              src={`../../icons/inventory-icons/${item.name}.png`}
              alt={item.name}
              onError={(e) => {
                e.target.src = "../../icons/inventory-icons/sconosciuto.png";
              }}
            />
          </td>
          <td>{item.name}</td>
          <td>{item.quantity}</td>
          <td>
            <MButton text="Elimina" onClick={() => this.handleDelete(item.ingredientID)} />
          </td>
        </tr>
      );
    });

    return (
      <ThemeManager>
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
            {this.state.showModal && <IngredientDelete onConfirm={this.handleDeleteConfirm}/>}
          </Modal>
        </div>
      </ThemeManager>
    );
  }
}
export default Inventario;
