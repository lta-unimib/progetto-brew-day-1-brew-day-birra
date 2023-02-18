import React, { Component }  from "react";
import MButton from '../components/MButton';
import {FAKE_NOTIFIER, RECIPE_ENDPOINT} from '../utils/Protocol';

class RecipeDelete extends Component{
  constructor(props) {
    super(props);
    this.state = {name: "", description: "", ingredients: []};
    this.notifier = this.props.notifier || FAKE_NOTIFIER;
  }

  triggerReload = () => {
      fetch(`/api/recipes/${this.props.recipeID}`)
      .then(response => response.json())
      .then(data => this.setState({...data}))
      .catch(() => this.notifier.error("verificare la connessione"))
  }

  componentDidMount() {
    this.triggerReload();
  }

  render(){
    return (
        <div>
          <center>
            <h1>{this.state.name}</h1>
            <p>{this.state.description}</p>
            <p>Sei sicuro di voler rimuovere la ricetta?</p>
            <MButton text="Conferma" onClick={() => this.deleteRecipe(this.state.recipeID)} />
          </center>
        </div>
    );
  }

  deleteRecipe = (id) => {
    fetch(RECIPE_ENDPOINT+ `${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(this.notifier.onRequestError("impossibile eliminare la ricetta"))
    .then(() => this.props.onConfirm(id))
}

}

export default RecipeDelete;
