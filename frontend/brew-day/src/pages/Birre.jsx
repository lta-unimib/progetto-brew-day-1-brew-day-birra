import React, { Component } from "react";
import BeerView from "../components/BeerView";
import BeerEdit from "../components/BeerEdit";
import BeerDelete from "../components/BeerDelete";
import Modal from "../components/Modal";
import { Button, ThemeProvider } from "@mui/material";
import theme from "../theme/theme";

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
      beersIDsFiltered: [],
      recipes: []
    };
  }

  componentDidMount() {
    fetch("/api/beer")
      .then((response) => response.json())
      .then((data) => {
        const beerIDs = data;
        const beersIDsFiltered = data;
        const promises = beerIDs.map(id => fetch(`/api/beer/${id}`));
        Promise.all(promises).then(results => {
          const beers = results.map(response => response.json());
          Promise.all(beers)
          .then(updatedBeers => {
            this.setState({ beerIDs, beers: updatedBeers, beersIDsFiltered});
            return updatedBeers.map(beer => beer.recipeID).filter((value, index, self) => self.indexOf(value) === index);
          })
          .then(updatedBeers => {
            Promise.all(updatedBeers.map(beer => fetch(`/api/recipes/${beer}`))) 
            .then(responses => Promise.all(responses.map(response => response.json())))
            .then(data => this.setState({recipes: data}))
          });
        });
      })
      .catch((error) => console.error(error));
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
      method: "DELETE",
    });
    /*this.setState((prevState) => {
      const updatedBeers = prevState.beers.filter(
        (beer) => beer.beerID !== prevState.selectedBeer.beerID
      );
      const updatedBeerIDs = prevState.beerIDs.filter(
        (id) => id !== prevState.selectedBeer.beerID
      );
      return { beers: updatedBeers, beerIDs: updatedBeerIDs, showModal: false };
    });*/
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
        return (
          <BeerEdit
            beerID={selectedBeer.beerID}
            name={selectedBeer.name}
            notes={selectedBeer.notes}
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

  setFilterName(event){
    let filterName = event.target.value;
    this.setState({filterName: filterName});
  }

  setFilterRecipe(event){
    let filterRecipe = event.target.value;
    this.setState({filterRecipe: filterRecipe});
  }
  
  render() {
    const {beersIDsFiltered, beers } = this.state;

    const itemList = beersIDsFiltered.map((item) => {
      const beer = beers.find((b) => b.beerID === item);
      return (
        <tr key={item}>
          <td>{beer.name}</td>
          <td>
            <Button style={{ marginRight: 10, marginTop: 10, marginBottom: 10 }} 
                    variant="contained" color="primary" 
                    onClick={() => this.handleView(beer)}>Dettagli</Button>
            <Button style={{ marginRight: 10, marginTop: 10, marginBottom: 10 }} 
                    variant="contained" color="primary" 
                    onClick={() => this.handleEdit(beer)}>Modifica</Button>
            <Button style={{ marginRight: 10, marginTop: 10, marginBottom: 10 }} 
                    variant="contained" color="primary"
                    onClick={() => this.handleDelete(beer)}>Elimina</Button>
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
              <th width="30%">FILTRA PER NOME</th>
              <th width="50%"><input value={null} type="text" style={{width: "90%", textAlign:"center"}} onChange={ (event) => this.setFilterName(event)}></input></th>
              <th width="20%"><button onClick={() => this.filterBeer()}>FILTRA</button>
                              <button onClick={() => this.removeFilter()}>TOGLI</button>
              </th>
            </tr>
            <tr>
              <th width="30%">FILTRA PER RICETTA</th>
              <th width="50%"><select options={this.state.recipesName} style={{width: "90%", textAlign:"center"}} onChange={ (event) => this.setFilterRecipe(event)}>
                
                {this.state.recipes.map((recipe) => (
                  <option value={recipe.recipeID} key={recipe.recipeID}>{recipe.name}</option>
                  ))
                }
                
                
                </select></th>
              <th width="20%"> <button onClick={() => this.filterBeer()}>FILTRA</button>
                              <button onClick={() => this.removeFilter()}>TOGLI</button>
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
      </ThemeProvider>
    );
  }

  filterBeer() {
    let url = "";
    if (this.state.filterName === ""){
      if (this.state.filterRecipe === ""){
        url = `/api/beer`;
      } else {
        url = `/api/beer?recipeID=${this.state.filterRecipe}`;
      }
    } else {
      if (this.state.filterRecipe === ""){
        url = `/api/beer?name=${this.state.filterName}`;
      } else {
        url = `/api/beer?name=${this.state.filterName}&&recipeID=${this.state.filterRecipe}`;
      }
    }

    fetch(url)
      .then(response => response.json())
      .then(beersIDsFiltered => {
        this.setState({beersIDsFiltered: beersIDsFiltered});
      })
  }

  removeFilter(){
    this.setState({beersIDsFiltered: this.state.beerIDs, filterName:"", filterRecipe:""})
  }

}
export default Birre;