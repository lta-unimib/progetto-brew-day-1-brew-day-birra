import React, { Component }  from "react";
import { Button, ThemeProvider } from "@mui/material";
import theme from "../theme/theme";

class RecipeDelete extends Component{

  constructor(props) {
    super(props);
    this.state = {name: props.name,
                  description: props.description,
                  id: props.recipeID};
    this.deleteRecipe = this.deleteRecipe.bind(this);
  }

  render(){
    return (
      <ThemeProvider theme={theme}>
        <div>
          <center>
            <h1>{this.state.name}</h1>
            <p>{this.state.description}</p>
            <Button style={{ marginRight: 10, marginTop: 10, marginBottom: 10 }} 
                    variant="contained" color="primary" 
                    className="recipeButton" 
                    onClick={() => this.deleteRecipe(this.state.id)}>Sei sicuro di voler rimuovere la ricetta?</Button>
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
}

}

export default RecipeDelete;
