import React, { Component } from "react";
import RecipeView from "../components/RecipeView";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      advice: {},
    };
  }
  componentDidMount() {
    console.log('componentDidMount')
    fetch("/api/advice")
      .then((res) => res.json())
      .then((data) => this.setState({ advice: data }));
  }
  render() {
    console.log('render')
    return (
      <div>
        <center>
          <h1 id="advice-h1">Vuoi un consiglio? Ecco quale birra dovresti preparare</h1>
          {Object.keys(this.state.advice).length === 0 ? null : (
            <RecipeView recipeID={this.state.advice.recipeID} />
          )}
        </center>
      </div>
    );
  }
}

export default Home;
