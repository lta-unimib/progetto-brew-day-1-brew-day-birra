import React, { Component }  from "react";

class RecipeDelete extends Component{

  constructor(props) {
    super(props);
    this.state = {name: props.name,
                  description: props.description,
                  id: props.name};
    this.deleteRecipe = this.deleteRecipe.bind(this);
  }

  render(){
    return (
      <div>
        <h1>{this.state.name}</h1>
        <p>{this.state.description}</p>
        <button className="recipeButton" onClick={() => this.deleteRecipe(this.state.id)}>Sei sicuro di voler rimuovere la ricetta?</button>
      </div>
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
