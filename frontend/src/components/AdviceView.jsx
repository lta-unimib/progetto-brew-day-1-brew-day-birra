import React from 'react';
import { FAKE_NOTIFIER, ADVICE_ENDPOINT } from '../utils/Protocol';
import RecipeView from './RecipeView';
import RecipeExecute from './RecipeExecute';

export default class AdviceView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      advice: null,
    };
    this.notifier = this.props.notifier || FAKE_NOTIFIER;
  }

  triggerReload = () => {
    fetch(ADVICE_ENDPOINT)
      .then((res) => res.json())
      .then((data) => this.setState({ advice: data }))
      .catch(() => this.setState({ advice: null }));
  }

  componentDidMount() {
    this.triggerReload();
  }

  render() {
    return (
      <div>
        <h1 className="advice-texts">Vuoi un consiglio?</h1>
        {this.state.advice === null ? (
          <div>
            <h2 className="advice-texts">Prova ad inserire qualche ricetta</h2>
            <h2 className="advice-texts">o a inventariare qualche ingrediente</h2>
          </div>
        ) : (
          <div>
            <h2 className="advice-texts">
              Ecco quale birra dovresti preparare
            </h2>
            <RecipeView
              notifier={this.notifier}
              recipeID={this.state.advice.recipeID}/>
            <RecipeExecute
              notifier={this.notifier}
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
  }
}
