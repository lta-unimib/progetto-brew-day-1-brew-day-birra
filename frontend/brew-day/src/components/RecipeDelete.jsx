import React, { Component }  from "react";
import { ThemeProvider } from "@mui/material";
import theme from "../theme/theme";
import MButton from '../components/MButton';

class RecipeDelete extends Component{
  constructor(props) {
    super(props);
    this.state = {name: "", description: "", ingredients: []};
    this.deleteRecipe = this.deleteRecipe.bind(this);
      this.triggerReload = this.triggerReload.bind(this);
  }

  triggerReload() {
      fetch(`/api/recipes/${this.props.recipeID}`)
      .then(response => response.json())
      .then(data => this.setState({...data}));
  }

  componentDidMount() {
    this.triggerReload();
  }

  render(){
    return (
      <ThemeProvider theme={theme}>
        <div>
          <center>
            <h1>{this.state.name}</h1>
            <p>{this.state.description}</p>
            <p>Sei sicuro di voler rimuovere la ricetta?</p>
            <MButton text="Conferma" onClick={() => this.deleteRecipe(this.state.recipeID)} />
          </center>
        </div>
      </ThemeProvider>
    );
  }

  deleteRecipe(id) {
    fetch(`/api/recipes/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    this.props.onConfirm();
}

}

export default RecipeDelete;
