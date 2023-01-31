import React, { Component } from "react";

class RecipeEdit extends Component{

  constructor(props) {
    super(props);
    this.state = {newIngredientName: null, newIngredientQuantity: null, ...props};
  }

  setQuantity(id, event){
    let quantity = event.target.value;
    this.setState({ingredients:     
      this.state.ingredients.map( item => {
        if(item.ingredientID == id){
          item.quantity=quantity;
        }
        return item;
      })
    })
  }

  setName(event){
    let newNameRecipe = event.target.value;
    this.setState({name: newNameRecipe})
  }

  setNewIngredientName(event){
    let newName = event.target.value;
    this.setState({newIngredientName: newName});
  }

  setNewIngredientQuantity(event){
    let newQuantity = event.target.value;
    this.setState({newIngredientQuantity: newQuantity});
  }

  render(){
    const itemList = this.state.ingredients.map(item => {
      return <tr key={item.ingredientID}>
          <td>{item.name}</td>
          <td><input value={item.quantity} type="text" style={{width: "50%", textAlign:"center"}} onChange={ (event) => this.setQuantity(item.ingredientID, event)}></input></td>
          <td>
              <button onClick={() => this.editQuantity(item.ingredientID)}>V</button>
              <button onClick={() => this.deleteIngredient(item.ingredientID)}>X</button>
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
              <tr>
                <td><input value={null} type="text" style={{width: "50%", textAlign:"center"}} onChange={ (event) => this.setNewIngredientName(event)}></input></td>
                <td><input value={null} type="text" style={{width: "50%", textAlign:"center"}} onChange={ (event) => this.setNewIngredientQuantity(event)}></input></td>
                <button onClick={() => this.addIngredient()}>V</button>
              </tr>
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
    });
  }

  editQuantity(id) {
    let newQuantity = [...this.state.ingredients].filter(i => i.ingredientID == id)[0].quantity;
    fetch(`/api/recipes/${this.state.recipeID}/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({quantity: newQuantity})
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
    });
  }

  addIngredient() {
    fetch(`/api/recipes/${this.state.recipeID}`, {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: this.state.newIngredientName, quantity: this.state.newIngredientQuantity})
  });
  }

}


export default RecipeEdit;