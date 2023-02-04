import React, { Component } from "react";
import { Button, ThemeProvider } from "@mui/material";
import theme from "../theme/theme";

class RecipeEdit extends Component{

  constructor(props) {
    super(props);
    this.state = {newIngredientName: null, newIngredientQuantity: null, ...props};
  }

  setQuantity(id, event){
    let quantity = event.target.value;
    this.setState({ingredients:     
      this.state.ingredients.map( item => {
        if(item.ingredientID === id){
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

  setDescription(event){
    let newDescription = event.target.value;
    this.setState({description: newDescription})
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
              <Button style={{ marginRight: 10, marginTop: 10, marginBottom: 10 }} 
                      variant="contained" color="primary" 
                      onClick={() => this.editQuantity(item.ingredientID)}>V</Button>
              <Button style={{ marginRight: 10, marginTop: 10, marginBottom: 10 }} 
                      variant="contained" color="primary" 
                      onClick={() => this.deleteIngredient(item.ingredientID)}>X</Button>
            </td>
        </tr>
    });
  
    return (
      <ThemeProvider theme={theme}>
        <div>
          <center>
          <table className="myTable">
              <tbody> 
                <tr>
                  <td> <p>Nome Ricetta:</p> </td>
                  <td><input id="nameTextArea" value={this.state.name} style={{width: "80%"}} onChange={ (event) => this.setName(event)}></input></td>
                  <td><Button style={{ marginRight: 10, marginTop: 10, marginBottom: 10 }} 
                              variant="contained" color="primary" 
                              onClick={() => this.editName()}>V</Button></td>        
                </tr>
              </tbody>
            </table>
            <table className="myTable">
              <tbody> 
                <tr>
                    <td><p>Descrizione:</p></td>
                    <td><textarea id="descriptionTextArea" value={this.state.description} style={{width: "80%"}} onChange={ (event) => this.setDescription(event)}></textarea></td>
                    <td><Button style={{ marginRight: 10, marginTop: 10, marginBottom: 10 }} 
                                variant="contained" color="primary" 
                                onClick={() => this.editDescription()}>V</Button></td>
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
                  <Button style={{ marginRight: 10, marginTop: 10, marginBottom: 10 }} 
                          variant="contained" color="primary" 
                          onClick={() => this.addIngredient()}>V</Button>
                </tr>
              </tbody>
            </table>
          </center>
        </div>
      </ThemeProvider>
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
    let newQuantity = [...this.state.ingredients].filter(i => i.ingredientID === id)[0].quantity;
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

  editDescription() {
    fetch(`/api/recipes/${this.state.recipeID}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({description: this.state.description})
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