import React, { Component } from "react";
import BeerView from "../components/BeerView";
import BeerEdit from "../components/BeerEdit";
import BeerDelete from "../components/BeerDelete";
import Modal from "../components/Modal";

class Birre extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beerIDs: [],
      beers: [],
      currentAction: "view",
      selectedBeer: null,
      showModal: false,
    };
  }

  componentDidMount() {
    fetch("/api/beer")
      .then(response => response.json())
      .then(data => {
        const beerIDs = data;
        const promises = beerIDs.map(id => fetch(`/api/beer/${id}`));

        Promise.all(promises).then(results => {
          const beers = results.map(response => response.json());
          Promise.all(beers).then(updatedBeers => {
            this.setState({ beerIDs, beers: updatedBeers });
          });
        });
      })
      .catch(error => console.error(error));
  }

  handleView(item) {
    this.setState({
      currentAction: "view",
      selectedBeer: item,
      showModal: true,
    });
  }

  handleEdit(item) {
    this.setState({
      currentAction: "edit",
      selectedBeer: item,
      showModal: true,
    });
  }

  handleDelete(item) {
    this.setState({
      currentAction: "delete",
      selectedBeer: item,
      showModal: true,
    });
  }

  setShowModal = () => {
    this.setState({ showModal: false });
  };

  handleDeleteConfirm = () => {
    const beerToDeleteID = this.state.selectedBeer.beerID;
    fetch(`/api/beer/${beerToDeleteID}`, {
      method: "DELETE"
    });
    this.setState((prevState) => {
      const updatedBeers = prevState.beers.filter(
        (beer) => beer.beerID !== prevState.selectedBeer.beerID
      );
      const updatedBeerIDs = prevState.beerIDs.filter(
        (id) => id !== prevState.selectedBeer.beerID
      );
      return { beers: updatedBeers, beerIDs: updatedBeerIDs, showModal: false };
    });
  };

  getCurrentComponent() {
    let selectedBeer = this.state.selectedBeer;
    let currentAction = this.state.currentAction;

    if (selectedBeer === null) {
      return null;
    }

    switch (currentAction) {
      case "view":
        return (
          <BeerView
            name={selectedBeer.name}
            recipeID={selectedBeer.recipeID}
            notes={selectedBeer.notes}
          />
        );
      case "edit":
        return <BeerEdit beerID={selectedBeer.beerID} name={selectedBeer.name} notes={selectedBeer.notes}/>;
      case "delete":
        return <BeerDelete beerID={selectedBeer.beerID} onConfirm={this.handleDeleteConfirm}/>;
      default:
        return null;
    }
  }
  
  render() {
    const { beerIDs, beers } = this.state;

    const itemList = beerIDs.map((item) => {
      const beer = beers.find((b) => b.beerID === item);
      return (
        <tr key={item}>
          <td>{beer.name}</td>
          <td>
            <button onClick={() => this.handleView(beer)}>Dettagli</button>
            <button onClick={() => this.handleEdit(beer)}>
              Modifica
            </button>
            <button onClick={() => this.handleDelete(beer)}>Elimina</button>
          </td>
        </tr>
      );
    });

    return (
      <div>
        <table className="myTable">
          <thead>
            <tr>
              <th width="50%">Nome</th>
              <th width="50%">Azioni</th>
            </tr>
          </thead>
          <tbody>{itemList}</tbody>
        </table>
        <Modal showModal={this.state.showModal} setShowModal={this.setShowModal}>
          {this.getCurrentComponent()}
        </Modal>
      </div>
    );
  }
}
export default Birre;