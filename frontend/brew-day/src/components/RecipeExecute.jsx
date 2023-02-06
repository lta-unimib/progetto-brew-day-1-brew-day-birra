import React, { Component } from "react";
import RecipeView from "./RecipeView";
import { ThemeProvider } from "@mui/material";
import theme from "../theme/theme";
import MButton from '../components/MButton';

class RecipeExecute extends Component{

    constructor(props) {
      super(props);
      this.state = {missingIngredients:[], newBeerName:"new Beer", newBeerQuantity: 0, ...props};
    }

    componentDidMount() {
      fetch(`/api/shopping/${this.state.recipeID}`)
      .then(response => response.json())
      .then(data => this.setState({missingIngredients: data}));
    }

    setNewBeerName(event) {
      let newBeerName = event.target.value;
      this.setState({newBeerName: newBeerName});
    }

    setNewBeerQuantity(event) {
      this.setState({newBeerQuantity: event.target.value});
    }

    render(){
      const itemList = this.state.missingIngredients.map(item => {
        let imagePath = `../../icons/inventory-icons/${item.name}.png`;
        let defaultImage = "../../icons/inventory-icons/sconosciuto.png";
        return <tr key={item.name}>
            <td>
              <img
                className="shoppingImage"
                src={imagePath}                 
                alt = ""
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src=defaultImage
                }}
              />
            </td>
            <td>{item.name}</td>
            <td>{item.quantity}</td>
          </tr>
      });


      const action = () => {
        if (this.state.missingIngredients.length === 0){
          return <div><table className="myTable"> 
                      <tbody>
                          <tr>
                            <td>Nome Nuova Birra: </td>
                            <td><input value={this.state.newBeerName} type="text" style={{width: "90%", textAlign:"center"}} onChange={ (event) => this.setNewBeerName(event)}></input></td>
                            <td><input value={this.state.newBeerQuantity} type="text" style={{width: "90%", textAlign:"center"}} onChange={ (event) => this.setNewBeerQuantity(event)}></input></td>
                            <td>
                              <MButton text="Crea birra" onClick={() => this.addBeer()} />
                            </td>
                          </tr>
                      </tbody>
                  </table>
          </div>;
        } else {
          return <div><center><h2>Ingredienti Mancanti</h2></center>
           <table className="myTable">
            <thead>
              <tr>
                <th width="25%">Immagine</th>
                <th width="25%">Nome</th>
                <th width="25%">Quantità</th>
              </tr>
            </thead>
            <tbody>
              {itemList}
            </tbody>
          </table>
          </div>
        }
      }

      return (
        <ThemeProvider theme={theme}>
          <div>
            <RecipeView name={this.state.name} description={this.state.description} ingredients={this.state.ingredients}/>
            {action()}
          </div>
        </ThemeProvider>
      );
    }

    addBeer() {
      fetch(`/api/beer`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: this.state.newBeerName, recipeID: this.state.recipeID, quantity: this.state.newBeerQuantity})
      })
      this.props.onConfirm();
    }

}

export default RecipeExecute;
