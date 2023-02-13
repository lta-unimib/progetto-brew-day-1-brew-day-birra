import React, { Component } from "react";
import BeerView from "../components/BeerView";
import BeerEdit from "../components/BeerEdit";
import BeerDelete from "../components/BeerDelete";
import Modal from "../components/Modal";
import MButton from "../components/MButton";
import ThemeManager from '../components/ThemeManager'
import {BEER_LIST_ENDPOINT, BEERS_ENDPOINT, RECIPE_ENDPOINT  } from '../Protocol';
import Selector from "../components/Selector";


class Birre extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beerIDs: [],
      beers: [],
      currentAction: "view",
      selectedBeer: null,
      showModal: false,
      filterRecipe: "",
      filterName: "",
      beerIDsFiltered: [],
      recipes: [],
    };
  }

  triggerReload = () => {
    fetch(BEER_LIST_ENDPOINT)
      .then((response) => response.json())
      .then((data) => {
        const beerIDs = data;
        const beerIDsFiltered = data;
        const promises = beerIDs.map((id) => fetch(BEERS_ENDPOINT+`${id}`));
        Promise.all(promises).then((results) => {
          const beers = results.map((response) => response.json());
          Promise.all(beers)
            .then((updatedBeers) => {
              this.setState({
                beerIDs,
                beers: updatedBeers,
                beerIDsFiltered,
              });
              return updatedBeers
                .map((beer) => beer.recipeID)
                .filter((value, index, self) => (self.indexOf(value) === index) && value !== null);
            })
            .then((updatedBeers) => {
              Promise.all(
                updatedBeers.map((beer) => fetch(RECIPE_ENDPOINT+`${beer}`))
              )
                .then((responses) =>
                  Promise.all(responses.map((response) => response.json()))
                )
                .then((data) => {
                  this.setState({ recipes: data });
                });
            });
        });
      })
      .catch((error) => console.error(error));
  };

  componentDidMount() {
    this.triggerReload();
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

  setShowModal = (flag) => {
    this.setState({ showModal: flag });
  };

  handleDeleteConfirm =  () => {
    const beerToDeleteID = this.state.selectedBeer.beerID;
     fetch(BEERS_ENDPOINT+`${beerToDeleteID}`, {
      method: "DELETE",
    }).then(() => {
      this.triggerReload();
      this.setShowModal(false);
    })
  };

  getCurrentComponent() {
    let selectedBeer = this.state.selectedBeer;
    let currentAction = this.state.currentAction;

    if (selectedBeer === null) {
      return null;
    }

    switch (currentAction) {
      case "view":
        return <BeerView beerID={selectedBeer.beerID} />;
      case "edit":
        return (
          <BeerEdit
            beerID={selectedBeer.beerID}
            onConfirm={this.triggerReload}
          />
        );
      case "delete":
        return (
          <BeerDelete
            beerID={selectedBeer.beerID}
            onConfirm={this.handleDeleteConfirm}
          />
        );
      default:
        return null;
    }
  }

  setFilterName = (event) => {
    let filterName = event.target.value;
    this.setState({ filterName: filterName });
  }

  setFilterRecipe = (event) => {
    let filterRecipe = event.target.value;
    this.setState({ filterRecipe: filterRecipe });
  }

  render() {
    const { beerIDsFiltered, beers } = this.state;

    const itemList = beerIDsFiltered.map((item) => {
      const beer = beers.find((b) => b.beerID === item);
      return (
        <tr key={item}>
          <td>{beer.name}</td>
          <td>
            <MButton text="Dettagli" onClick={() => this.handleView(beer)} />
            <MButton text="Modifica" onClick={() => this.handleEdit(beer)} />
            <MButton text="Elimina" onClick={() => this.handleDelete(beer)} />
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
                <th width="30%">FILTRA PER NOME</th>
                <th width="50%">
                  <input
                    value={this.state.filterName}
                    type="text"
                    style={{ width: "90%", textAlign: "center" }}
                    onChange={(event) => this.setFilterName(event)}
                  ></input>
                </th>
                <th width="20%">
                  <MButton text="Filtra" onClick={() => this.filterBeer()} />
                  <MButton text="Togli" onClick={() => this.removeFilter()} />
                </th>
              </tr>
              <tr>
                <th width="30%">FILTRA PER RICETTA</th>
                <th width="50%">
                  <Selector
                    label="Recipe"
                    value={this.state.filterRecipe}
                    onChange={this.setFilterRecipe}
                    options={this.state.recipes.map((recipe) => { return {name: recipe.name, value: recipe.recipeID}; })}
                  />
                </th>
                <th width="20%">
                  <MButton text="Filtra" onClick={() => this.filterBeer()} />
                  <MButton text="Togli" onClick={() => this.removeFilter()} />
                </th>
              </tr>
              <tr>
                <th width="50%">Nome</th>
                <th width="50%">Azioni</th>
              </tr>
            </thead>
            <tbody>{itemList}</tbody>
          </table>
          <Modal
            showModal={this.state.showModal}
            setShowModal={this.setShowModal}
          >
            {this.getCurrentComponent()}
          </Modal>
        </div>
      </ThemeManager>
    );
  }

  filterBeer() {
    let url = "";
    if (this.state.filterName === "") {
      if (this.state.filterRecipe === "") {
        url = BEER_LIST_ENDPOINT;
      } else {
        url = BEER_LIST_ENDPOINT + `?recipeID=${this.state.filterRecipe}`;
      }
    } else {
      if (this.state.filterRecipe === "") {
        url = BEER_LIST_ENDPOINT + `?name=${this.state.filterName}`;
      } else {
        url = BEER_LIST_ENDPOINT + `?name=${this.state.filterName}&&recipeID=${this.state.filterRecipe}`;
      }
    }

    fetch(url)
      .then((response) => response.json())
      .then((beerIDsFiltered) => {
        this.setState({ beerIDsFiltered: beerIDsFiltered });
      });
  }

  removeFilter() {
    this.setState({
      beerIDsFiltered: this.state.beerIDs,
      filterName: "",
      filterRecipe: "",
    });
  }
}
export default Birre;
