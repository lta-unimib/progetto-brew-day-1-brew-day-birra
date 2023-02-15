import React from "react";
import { RECIPE_ENDPOINT } from '../Protocol';
import RecipeIngredientTableReadOnly from "./RecipeIngredientTableReadOnly";

export default class RecipeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: "", description: "", ingredients: []};
      this.triggerReload = this.triggerReload.bind(this);
  }

  triggerReload() {
      fetch(RECIPE_ENDPOINT + `${this.props.recipeID}`)
      .then(response => response.json())
      .then(data => this.setState({...data}));
  }

  componentDidMount() {
    this.triggerReload();
  }

  render() {
    return (
      <div>
        <center>
          <h1> {this.state.name}</h1>
          <p> {this.state.description} </p>
          <RecipeIngredientTableReadOnly
            ingredients={this.state.ingredients}/>
        </center>
      </div>
    );
  }
};

