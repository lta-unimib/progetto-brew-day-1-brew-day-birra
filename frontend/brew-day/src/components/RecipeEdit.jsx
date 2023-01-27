import React, { Component } from "react";

class RecipeEdit extends Component{

  constructor(props) {
    super(props);
    this.state = props;
  }

  setQuantity(id, event){
    let quantity = event.target.value;
    this.setState({ingredients:     
      this.state.ingredients.map( item => {
        if(item.name == id){
          item.quantity=quantity;
        }
        return item;
      })
    })
  }

  setName(event){
    let newName = event.target.value;
    this.setState({name: newName})
  }

  render(){
    const itemList = this.state.ingredients.map(item => {
      return <tr key={item.name}>
          <td>{item.name}</td>
          <td><input value={item.quantity} type="text" style={{width: "50%", textAlign:"center"}} onChange={ (event) => this.setQuantity(item.name, event)}></input></td>
          <td>
              <button onClick={() => this.editQuantity(item.name)}>V</button>
              <button onClick={() => this.deleteIngredient(item.name)}>X</button>
            </td>
        </tr>
    });
  
    return (
      <div>
        <center>
        <table className="myTable">
            <tbody> 
              <tr>
                <td> <p>Nome Ricetta:</p> </td>
                <td><input id="nameTextArea" value={this.state.name} style={{width: "80%"}} onChange={ (event) => this.setName(event)}></input></td>
                <td><button onClick={() => this.editName()}>V</button></td>        
              </tr>
            </tbody>
          </table>
          <table className="myTable">
            <tbody> 
              <tr>
                  <td><p>Descrizione:</p></td>
                  <td><textarea id="descriptionTextArea" value={this.state.description} style={{width: "80%"}}></textarea></td>
                  <td><button onClick={() => this.handleEdit()}>V</button></td>    
              </tr>
            </tbody>
          </table>
          
          <table className="myTable">
            <thead>
              <tr>
                <th width="30%">Nome</th>
                <th width="30%">Quantità</th>
                <th width="30%">Azioni</th>
              </tr>
            </thead>
            <tbody>
              {itemList}
            </tbody>
          </table>
        </center>
      </div>
    );
  }

  deleteIngredient(id) {
    fetch(`/api/recipes/${this.state.recipeID}/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(() => {
        //let updatedRecipes = [...this.state.recipes].filter(i => i.recipeID !== id);
        //this.setState({recipes: updatedRecipes});
    });
  }

  editQuantity(id) {
    let newQuantity = [...this.state.ingredients].filter(i => i.name == id)[0].quantity;
    fetch(`/api/recipes/${this.state.recipeID}/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({quantity: newQuantity})
    }).then(() => {
        //let updatedRecipes = [...this.state.recipes].filter(i => i.recipeID !== id);
        //this.setState({recipes: updatedRecipes});
    });
  }

  editName() {
    fetch(`/api/recipes/${this.state.recipeID}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: this.state.name})
    }).then(() => {
        //let updatedRecipes = [...this.state.recipes].filter(i => i.recipeID !== id);
        //this.setState({recipes: updatedRecipes});
    });
  }

  addIngredient() {
    
  }

}


export default RecipeEdit;