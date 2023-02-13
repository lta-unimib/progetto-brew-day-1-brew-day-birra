import React, { Component } from "react";
import RecipeView from "./RecipeView";
import MButton from "../components/MButton";
import { RECIPE_ENDPOINT, SHOPPING_ENDPOINT, BEER_LIST_ENDPOINT, SETTINGS_ENDPOINT} from '../Protocol';
import ShoppingList from "./ShoppingList";

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

    this.triggerReload = this.triggerReload.bind(this);
    this.addBeer = this.addBeer.bind(this);
  }

  triggerReload() {
    const recipeID = this.props.recipeID;
    fetch(RECIPE_ENDPOINT+`${recipeID}`)
      .then((response) => response.json())
      .then((data) => this.setState({ ...data }));
  }

  triggerReloadSettings() {
      fetch(SETTINGS_ENDPOINT + "equipment")
      .then(response => response.json())
      .then(data => this.setState({equipment: data.value}));
    }


  componentDidMount() {
    this.triggerReload();
    this.triggerReloadSettings();
  }

  setNewBeerName(event) {
    let newBeerName = event.target.value;
    this.setState({ newBeerName: newBeerName });
  }

  setNewBeerQuantity(event) {
    this.setState({ newBeerQuantity: event.target.value });
  }

  render() {
    const action = () => {

      if (this.state.missingEquipment) {
        return (
          <div>
            <center>
              <h2 style={{color: (this.props.color ?? 'black')}}>Equipaggiamento Mancante</h2>
            </center>
          </div>
        );
      }

      if (this.state.missingIngredients) {
        return <div> <ShoppingList recipeID={this.props.recipeID} quantity={this.state.newBeerQuantity}/> </div>
      }
    };

    return (
        <div>
          {Object.keys(this.state.name).length === 0 ? null : (
            <RecipeView
              color={this.props.color}
              name={this.state.name}
              description={this.state.description}
              ingredients={this.state.ingredients}
              recipeID={this.state.recipeID}
            />
          )}

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
                    <input
                      value={this.state.newBeerQuantity}
                      type="text"
                      style={{ width: "90%", textAlign: "center" }}
                      onChange={(event) => this.setNewBeerQuantity(event)}
                    ></input>
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
    if(this.state.newBeerQuantity > parseFloat(this.state.equipment)){
      this.setState({missingEquipment: true});
    } else {
      this.setState({missingEquipment: false});
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
              this.setState({missingIngredients: true});
            } else {
              this.props.onConfirm();
          }});
    }
  }

}
export default RecipeExecute;
