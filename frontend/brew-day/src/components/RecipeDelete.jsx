import React, { Component }  from "react";

class RecipeDelete extends Component{

  constructor(props) {
    super(props);
    this.state = props;
    this.deleteRecipe = this.deleteRecipe.bind(this);
  }

  render(){
    return (
      <div>
        <h1>{this.state.name}</h1>
        <p>{this.state.description}</p>
        <button onClick={() => this.deleteRecipe(this.state.name)}>Elimina</button>
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