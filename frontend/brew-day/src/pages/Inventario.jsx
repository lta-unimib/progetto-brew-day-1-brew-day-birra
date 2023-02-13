import React, { Component } from "react";
import IngredientDelete from "../components/IngredientDelete";
import Modal from "../components/Modal";
import {INVENTORY_LIST_ENDPOINT, INVENTORY_ENDPOINT} from '../Protocol';
import ThemeManager from "../components/ThemeManager";
import InventoryTable from "../components/InventoryTable";

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

  handleDelete = (ingredientID) => {
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

    return (
      <ThemeManager>
        <div>
          <InventoryTable
            items={inventory}
            handleDelete={this.handleDelete}
          />
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
