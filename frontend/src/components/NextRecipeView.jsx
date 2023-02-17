import React, { Component } from "react";
import RecipeView from "./RecipeView";
import MButton from "./MButton";
import { SHOPPING_ENDPOINT, BEER_LIST_ENDPOINT, SETTINGS_ENDPOINT, FAKE_NOTIFIER, isNotValidPositiveQuantity } from '../utils/Protocol';
import ShoppingList from "./ShoppingList";
import { TextField } from "@mui/material";
import CoffeeMakerIcon from '@mui/icons-material/CoffeeMaker';

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
    this.notifier = this.props.notifier || FAKE_NOTIFIER;
  }

  getNextRecipeID = () => {
    return new Promise((acc, rej) => {
      fetch(SETTINGS_ENDPOINT + "nextRecipeID")
      .then(response => response.json())
      .then(data => {
          this.setState({nextRecipeID: data.value})
          acc();
      })
      .catch(() => {
        this.updateNextRecipeSetting("nextRecipeID", "")
        rej();
      })
    })
  }

  getNextRecipeQuantity = () => {
    return new Promise((acc, rej) => {
      fetch(SETTINGS_ENDPOINT + "nextRecipeQuantity")
      .then(response => response.json())
      .then(data => {
          this.setState({nextRecipeQuantity: Number(data.value)})
          acc();
      })
      .catch(() => {
        this.updateNextRecipeSetting("nextRecipeQuantity", "")
        rej();
      })
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
      .catch(this.notifier.connectionError)
    })
  }

  getEquipment = () => {
    return new Promise((acc, rej) => {
      fetch(SETTINGS_ENDPOINT + "equipment")
      .then(response => response.json())
      .then(data => this.setState({equipment: parseFloat(data.value)}))
      .catch(this.notifier.connectionError)
    })
  }

  componentDidMount() {
    this.triggerReload();
  }

  triggerReload = () => {
    this.getNextRecipeID().then(this.getNextRecipeQuantity).then(this.getShoppingList).then(this.getEquipment).catch(() => {});
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
              <h2>Si chiede di fare {this.state.nextRecipeQuantity} litri ma si dispone di una capacita' di {this.state.equipment} litri</h2>
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
                  <td>Nuova Birra</td>
                  <td>
                    <TextField
                      label="Name"
                      value={this.state.newBeerName}
                      style={{ width: "90%", textAlign: "center" }}
                      onChange={this.setNewBeerName}
                    />
                  </td>
                  <td>
                    <MButton startIcon={<CoffeeMakerIcon/>} text="Crea" onClick={() => this.addBeer()} />
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

  addBeer() {
    if (this.state.newBeerName === "")
      return this.notifier.warning("il nome della birra non deve essere vuoto");
    if (isNotValidPositiveQuantity(this.state.nextRecipeQuantity))
      return this.notifier.warning("la quantita' di litri di birra prodotta deve essere strettamente positiva");
    if(this.state.nextRecipeQuantity > parseFloat(this.state.equipment)) {
      this.setState({missingEquipment: true});
      this.notifier.warning("la capacita' dell'equipaggiamento e' insufficiente");
    } else {
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
      }).then((response) => {
        if (response.status >= 400 && response.status < 600) {
          this.setState({missingEquipment: false, missingIngredients: true});
          this.notifier.warning("mancano degli ingredienti");
        } else {
          this.resetNextRecipeSettings();
          this.notifier.success("birra creata con successo");
      }});
    }
  }

  resetNextRecipeSettings = () => {
    this.updateNextRecipeSetting("nextRecipeID", "")
    .then(() => this.updateNextRecipeSetting("nextRecipeQuantity", ""))
    .then(this.triggerReload);
  }

  updateNextRecipeSetting = (settingID, value) => {
    return new Promise((acc, rej) => {
      fetch(SETTINGS_ENDPOINT + `${settingID}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({value: value})
      }).then(() => acc());
    });
  }

}
