import React, { Component } from "react";
import RecipeView from "./RecipeView";
import MButton from "../components/MButton";
import { RECIPE_ENDPOINT, BEER_LIST_ENDPOINT, SETTINGS_ENDPOINT, FAKE_NOTIFIER} from '../utils/Protocol';
import ShoppingList from "./ShoppingList";
import QuantityInput from "./QuantityInput";

class RecipeExecute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      missingIngredients: false,
      newBeerName: "new Beer",
      newBeerQuantity: 0,
      name: "",
      description: "",
      ingredients: [],
      equipment: "",
      missingEquipment: false
    };
    this.notifier = this.props.notifier || FAKE_NOTIFIER;
  }

  triggerReload = () => {
    return new Promise((acc, rej) => {
      const recipeID = this.props.recipeID;
      fetch(RECIPE_ENDPOINT+`${recipeID}`)
        .then((response) => response.json())
        .then((data) => this.setState({ ...data }))
        .catch(this.notifier.connectionError)
    })
  }

  triggerReloadSettings = () => {
      return new Promise((acc, rej) => {
        fetch(SETTINGS_ENDPOINT + "equipment")
        .then(response => response.json())
        .then(data => this.setState({equipment: data.value}))
        .catch(this.notifier.connectionError)
      });
    }


  componentDidMount() {
    this.triggerReload().then(this.triggerReloadSettings);
  }

  setNewBeerName = (event) => {
    let newBeerName = event.target.value;
    this.setState({ newBeerName: newBeerName });
  }

  setNewBeerQuantity = (event) => {
    this.setState({ newBeerQuantity: event.target.value });
  }

  render() {
    const action = () => {

      if (this.state.missingEquipment) {
        return (
          <div>
            <center>
              <h2>Equipaggiamento Mancante</h2>
            </center>
          </div>
        );
      }

      if (this.state.missingIngredients) {
        return (<ShoppingList notifier={this.notifier} recipeID={this.props.recipeID} quantity={this.state.newBeerQuantity}/>);
      }
    };

    return (
        <div>
          <table className="myTable">
              <tbody>
                <tr>
                  <td>Nome Nuova Birra: </td>
                  <td>
                    <input
                      value={this.state.newBeerName}
                      type="text"
                      style={{ width: "90%", textAlign: "center" }}
                      onChange={this.setNewBeerName}
                    ></input>
                  </td>
                  <td>
                    <QuantityInput
                      value={this.state.newBeerQuantity}
                      onChange={this.setNewBeerQuantity}
                    ></QuantityInput>
                  </td>
                  <td>
                    <MButton text="Crea" onClick={() => this.addBeer()} />
                  </td>
                </tr>
              </tbody>
            </table>
          {action()}
        </div>
    );
  }

  addBeer() {
    if(this.state.newBeerQuantity > parseFloat(this.state.equipment)) {
      this.setState({missingEquipment: true});
      this.notifier.warning("capacita' dell'equipaggiamento insufficiente");
    } else {
      fetch(BEER_LIST_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: this.state.newBeerName,
          recipeID: this.state.recipeID,
          quantity: this.state.newBeerQuantity,
        }),
      }).then((response) => {
        if (response.status >= 400 && response.status < 600) {
          this.setState({missingEquipment: false, missingIngredients: true});
          this.notifier.warning("mancano degli ingredienti");
        } else {
          this.props.onConfirm();
          this.notifier.success("birra creata con successo");
      }});
    }
  }

}
export default RecipeExecute;
