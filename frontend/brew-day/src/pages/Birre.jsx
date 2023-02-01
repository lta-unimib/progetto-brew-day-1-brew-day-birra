import React, { Component } from "react";
import BeerView from "../components/BeerView";
import Modal from "../components/Modal";

class Birre extends Component {
  constructor(props) {
    super(props);
    this.state = { beerIDs: ["id0", "id1", "id2"], beers: [
      {
        "beerID":"id0",
        "name": "Birra 0",
        "recipeID":"Ricetta 0"
      },
      {
        "beerID":"id1",
        "name": "Birra 1",
        "recipeID":"Ricetta 1"
      },
      {
        "beerID":"id2",
        "name": "Birra 2",
        "recipeID":"Ricetta 2"
      }],
      currentAction: "view", selectedBeer: null, showModal:false};
  }

  /*componentDidMount() {
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
  };*/

  handleView(item) {
    this.setState({currentAction:"view", selectedBeer:item, showModal:true})
  };

  setShowModal = () => {
    this.setState({ showModal: false });
  };
  

  render() {
    const { beerIDs, beers } = this.state;

    const itemList = beerIDs.map((item) => {
      const beer = beers.find(b => b.beerID === item);
      return (
        <tr key={item}>
          <td>{beer.name}</td>
          <td>
            <button onClick={() => this.handleView(item)}>Dettagli</button>
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
          <BeerView />
        </Modal>
      </div>
    );
  }
}
export default Birre;