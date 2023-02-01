import React, { Component } from "react";
import BeerView from "../components/BeerView";
import BeerAddNote from "../components/BeerAddNote";
import Modal from "../components/Modal";

class Birre extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beerIDs: ["id0", "id1", "id2"],
      beers: [
        {
          beerID: "id0",
          name: "Birra 0",
          recipeID: "Ricetta 0",
          notes: [{
            beerID: "id0",
            nodeID: "note0",
            noteType: "",
            description: "cold brewed"
          }]
        },
        {
          beerID: "id1",
          name: "Birra 1",
          recipeID: "Ricetta 1",
          notes: [{
            beerID: "id1",
            nodeID: "note1",
            noteType: "",
            description: "dented glass"
          }, {
            beerID: "id1",
            nodeID: "note2",
            noteType: "",
            description: "not filtered"
          }]
        },
        {
          beerID: "id2",
          name: "Birra 2",
          recipeID: "Ricetta 2",
          notes: []
        },
      ],
      currentAction: "view",
      selectedBeer: null,
      showModal: false,
    };
  }

  handleView(item) {
    this.setState({
      currentAction: "view",
      selectedBeer: item,
      showModal: true,
    });
  }

  handleAddNote(item) {
    this.setState({
      currentAction: "add",
      selectedBeer: item,
      showModal: true,
    });
  }

  setShowModal = () => {
    this.setState({ showModal: false });
  };

  getCurrentComponent() {
    let selectedBeer = this.state.selectedBeer;
    let currentAction = this.state.currentAction;
  
    if (selectedBeer === null) {
      return null;
    }
  
    switch (currentAction) {
      case "view":
        return <BeerView name={selectedBeer.name} recipeID={selectedBeer.recipeID} notes={selectedBeer.notes}/>;
      case "add":
        return <BeerAddNote />;
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
            <button onClick={() => this.handleAddNote(beer)}>Aggiungi nota</button>
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