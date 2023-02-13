import React, { Component } from "react";
import RecipeView from "./RecipeView";
import MButton from "./MButton";
import { RECIPE_ENDPOINT, SHOPPING_ENDPOINT, BEER_LIST_ENDPOINT, SETTINGS_ENDPOINT} from '../Protocol';
import ShoppingList from "./ShoppingList";

export default class NextRecipeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      missingIngredients: [],
      newBeerName: "new Beer",
      nextRecipeQuantity: null,
      nextRecipeID: "",
      equipment: "",
      recipe: {},
    };
  }

  getNextRecipeID = () => {
    return new Promise((acc, rej) => {
      fetch(SETTINGS_ENDPOINT + "nextRecipeID")
      .then(response => response.json())
      .then(data => this.setState({nextRecipeID: data.value}))
      .then(() => acc());
    })
  }

  getNextRecipeQuantity = () => {
    return new Promise((acc, rej) => {
      fetch(SETTINGS_ENDPOINT + "nextRecipeQuantity")
      .then(response => response.json())
      .then(data => this.setState({nextRecipeQuantity: parseFloat(data.value)}))
      .then(() => acc());
    })
  }

  getShoppingList = () => {
    return new Promise((acc, rej) => {
      fetch(SHOPPING_ENDPOINT + `${this.state.nextRecipeID}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quantity: this.state.nextRecipeQuantity,
        }),
      })
      .then((response) => response.json())
      .then((data) => this.setState({ missingIngredients: data }))
      .then(() => acc())
    })
  }

  getEquipment = () => {
    return new Promise((acc, rej) => {
      fetch(SETTINGS_ENDPOINT + "equipment")
      .then(response => response.json())
      .then(data => this.setState({equipment: parseFloat(data.value)}));
    })
  }

  componentDidMount() {
    this.triggerReload();
  }

  triggerReload = () => {
    this.getNextRecipeID().then(this.getNextRecipeQuantity).then(this.getShoppingList).then(this.getEquipment);
  }

  setNewBeerName = (event) => {
    let newBeerName = event.target.value;
    this.setState({ newBeerName: newBeerName });
  }

  render() {
    const action = () => {

      if (this.state.equipment < this.state.nextRecipeQuantity) {
        return (
          <div>
            <center>
              <h2>Equipaggiamento Mancante</h2>
            </center>
          </div>
        );
      } else if (this.state.missingIngredients.length !== 0) {
        return (<ShoppingList recipeID={this.state.nextRecipeID} quantity={this.state.nextRecipeQuantity}/>);
      } else {
        return <div>
          <table className="myTable">
              <tbody>
                <tr>
                  <td>Nome Nuova Birra: </td>
                  <td>
                    <input
                      value={this.state.newBeerName}
                      type="text"
                      style={{ width: "90%", textAlign: "center" }}
                      onChange={(event) => this.setNewBeerName(event)}
                    ></input>
                  </td>
                  <td>
                    <MButton text="Crea" onClick={() => this.addBeer()} />
                  </td>
                </tr>
              </tbody>
            </table>
        </div>
      }
    };

    return (
        <div>
          {this.state.nextRecipeID === null || this.state.nextRecipeID === "" ? (
              <h1 className="advice-texts">Nessuna ricetta in programma</h1>
            ) : (
              <div>
                <h1 className="advice-texts">Ecco la prossima birra in programma</h1>
                <RecipeView recipeID={this.state.nextRecipeID}/>
                {action()}
              </div>
            )}
        </div>
    );
  }

  addBeer = () => {
      fetch(BEER_LIST_ENDPOINT, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: this.state.newBeerName,
              recipeID: this.state.nextRecipeID,
              quantity: this.state.nextRecipeQuantity,
            }),
          }).then( this.resetNextRecipeSettings());
    
  }

  resetNextRecipeSettings = () => {
    this.updateNextRecipeSetting("nextRecipeID", "")
    this.updateNextRecipeSetting("nextRecipeQuantity", "0");
  }

  updateNextRecipeSetting = (settingID, value) => {
    fetch(SETTINGS_ENDPOINT + `${settingID}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({value: value})
    }).then(() => this.triggerReload());
  }

}