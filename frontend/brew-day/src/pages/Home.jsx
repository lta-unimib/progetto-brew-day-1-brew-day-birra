import React, { Component } from "react";
import NextRecipeView from "../components/NextRecipeView";
import RecipeExecute from "../components/RecipeExecute";
import BodyThemeManager from "../components/BodyThemeManager";
import {ADVICE_ENDPOINT } from '../Protocol';
import ContentCard from '../components/ContentCard';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      advice: null,
    };
  }

  triggerReload() {
    fetch(ADVICE_ENDPOINT)
      .then((res) => res.json())
      .then((data) => this.setState({ advice: data }))
      .catch(() => {});
  }

  componentDidMount() {
    this.triggerReload();
  }

  render() {
    const adviceView = (
      <div>
      <h1 className="advice-texts">Vuoi un consiglio?</h1>
      {this.state.advice === null ? (
        <h1 className="advice-texts">Prova ad inserire qualche ricetta</h1>
      ) : (
        <div>
          <h1 className="advice-texts">
            Ecco quale birra dovresti preparare
          </h1>
          <RecipeExecute
            recipeID={this.state.advice.recipeID}
            onConfirm={this.triggerReload}
          />
          <h3 className="advice-texts">
            La massima quantità realizzabile è {" "}
            {this.state.advice.quantity === -1 ? "infinita" : this.state.advice.quantity}
          </h3>
        </div>
      )}
      </div>
    );

    const nextRecipeView = (
      <NextRecipeView/>
    );
    //<center>{adviceView}</center>

    return (
      <BodyThemeManager>
        <div style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "stretch",
          flexFlow: "row wrap"
        }}>
          <ContentCard>{adviceView}</ContentCard>
          <ContentCard>{nextRecipeView}</ContentCard>
        </div>
      </BodyThemeManager>
    );
  }
}

export default Home;
