import React, { Component } from "react";
import RecipeExecute from "../components/RecipeExecute";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      advice: null
    };
  }
  componentDidMount() {
    fetch("/api/advice")
      .then((res) => res.json())
      .then((data) => this.setState({ advice: data }))
      .catch(() => {});
  }
  render() {
    return (
      <div>
        <center>
          <h1 className="advice-texts">Vuoi un consiglio?</h1>
          {(this.state.advice === null) ? 
            <h1>Prova ad inserire qualche ricetta</h1>
          : (
            <div>
              <h1>Ecco quale birra dovresti preparare</h1>
              <RecipeExecute recipeID={this.state.advice.recipeID} color="white"/>
              <h3 className="advice-texts">La massima quantità realizzabile è di {this.state.advice.quantity}</h3>
            </div>
          )}
        </center>
      </div>
    );
  }
}

export default Home;