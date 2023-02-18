import React, { Component } from "react";
import RecipeView from "./RecipeView";
import MButton from "./MButton";
import { SHOPPING_ENDPOINT, BEER_LIST_ENDPOINT, FAKE_NOTIFIER } from '../utils/Protocol';
import ShoppingList from "./ShoppingList";
import { TextField } from "@mui/material";
import SettingsManager from '../utils/SettingsManager';
import BirreIcon from "../svgicons/BirreIcon";

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
    this.settingsManager = new SettingsManager();
  }

  getNextRecipeID = () => {
    return new Promise((acc, rej) => {
      this.settingsManager.getSetting("nextRecipeID")
      .then(data => {
        if (data.value !== "") {
          this.setState({nextRecipeID: data.value}, acc)
        } else rej();
      })
      .catch((err) => {
        this.settingsManager.putSetting("nextRecipeID", "")
        rej(err);
      })
    })
  }

  getNextRecipeQuantity = () => {
    return new Promise((acc, rej) => {
      this.settingsManager.getSetting("nextRecipeQuantity")
      .then(data => {
        if (data.value !== "") {
          this.setState({nextRecipeQuantity: data.value}, acc)
        } else rej();
      })
      .catch((err) => {
        this.settingsManager.putSetting("nextRecipeQuantity", "0")
        rej(err);
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
      .then((data) => this.setState({ missingIngredients: data }, acc))
      .catch(err => rej(err))
    })
  }

  getEquipment = () => {
    return new Promise((acc, rej) => {
      this.settingsManager.getSetting("equipment")
      .then(data => {
        if (data.value !== "") {
          this.setState({equipment: Number(data.value)}, acc)
        } else rej();
      })
      .catch((err) => {
        this.notifier.connectionError()
        rej(err)
      })
    })
  }

  componentDidMount() {
    this.triggerReload();
  }

  triggerReload = () => {
    this.getNextRecipeID()
    .then(this.getNextRecipeQuantity)
    .then(this.getShoppingList)
    .then(this.getEquipment)
    .catch(() => {})
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
                      label="Beer Name"
                      value={this.state.newBeerName}
                      style={{ width: "90%", textAlign: "center" }}
                      onChange={this.setNewBeerName}
                    />
                  </td>
                  <td>
                    <MButton startIcon={<BirreIcon/>} text="Crea" onClick={() => this.addBeer()} />
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
    if (this.state.newBeerName === "") {
      return this.notifier.warning("il nome della birra non deve essere vuoto");
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
      })
      .then((response) => {
        if (response.status >= 400)
          throw new Error();
      })
      .then(() => {
        this.resetNextRecipeSettings();
        this.notifier.success("birra creata con successo");
      })
      .catch(() => {
        this.setState({missingIngredients: true});
        this.notifier.warning("mancano degli ingredienti");
      })
    }
  }

  resetNextRecipeSettings = () => {
    this.settingsManager.putSetting("nextRecipeID", "")
    .then(() => this.settingsManager.putSetting("nextRecipeQuantity", ""))
    .then(() => this.setState({
      nextRecipeQuantity: null,
      nextRecipeID: ""
    }))
    .then(this.triggerReload);
  }
}