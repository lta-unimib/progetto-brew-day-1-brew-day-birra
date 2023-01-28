import React, { Component } from 'react';
import Modal from "../components/Modal";
import RecipeView from "../components/RecipeView";
import RecipeEdit from "../components/RecipeEdit";
import RecipeDelete from "../components/RecipeDelete";


class Ricette extends Component {

    constructor(props) {
        super(props);
        this.state = {recipes: [], currentAction: "view", selectedRecipe: null, showModal:false, newRecipeName: null, newRecipeDescription: null};
        this.handleView = this.handleView.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.getCurrentComponent = this.getCurrentComponent.bind(this);
        this.setShowModal = this.setShowModal.bind(this);
    }

    componentDidMount() {
        fetch("/api/recipes")
        .then(response => response.json())
        .then(recipeIDs => Promise.all(recipeIDs.map(recipeID => fetch(`api/recipes/${recipeID}`))))
        .then(responses => Promise.all(responses.map(response => response.json())))
        .then(data => this.setState({recipes: data}));
    }

    handleView(item) {
      this.setState({currentAction:"view", selectedRecipe:item, showModal:true})
    };

    handleEdit(item) {
      this.setState({currentAction:"edit", selectedRecipe:item, showModal:true})
    };    
    
    handleDelete(item) {
      this.setState({currentAction:"delete", selectedRecipe:item, showModal:true})
    };


    getCurrentComponent(){
      let selectedRecipe = this.state.selectedRecipe;
      let currentAction = this.state.currentAction;
      if (!selectedRecipe) return <div>Caricamento...</div>;
      switch (currentAction) {
        case "view":
          return <RecipeView name={selectedRecipe.name} description={selectedRecipe.description} ingredients={selectedRecipe.ingredients} />;
        case "edit":
          return <RecipeEdit recipeID={selectedRecipe.recipeID} name={selectedRecipe.name} description={selectedRecipe.description} ingredients={selectedRecipe.ingredients} />;
        case "delete":
          return <RecipeDelete name={selectedRecipe.name} description={selectedRecipe.description} ingredients={selectedRecipe.ingredients} />;
        //case "execute":
        //  return <RecipeExecute name={selectedRecipe.name} description={selectedRecipe.description} ingredients={selectedRecipe.ingredients} />;
        default:
          return null;
      }
    }

    setNewRecipeName(event){
      let newRecipeName = event.target.value;
      this.setState({newRecipeName: newRecipeName});
    }
  
    setNewRecipeDescription(event){
      let newRecipeDescription = event.target.value;
      this.setState({newRecipeDescription: newRecipeDescription});
    }

    setShowModal(flag){
      this.setState({showModal:flag})
    }

    
    render() {
        const {recipes, isLoading} = this.state;
        
        if (isLoading) {
            return <p>Caricamento...</p>;
        }
        
        const itemList = recipes.map(item => {
            return <tr key={item.recipeID}>
              <td>{item.name}</td>
              <td>Qui ci andrà la descrizione della ricetta</td>
              <td>
                <button onClick={() => this.handleView(item)}>Dettagli</button>
                <button onClick={() => this.handleEdit(item)}>Modifica</button>
                <button onClick={() => this.handleDelete(item)}>Elimina</button>
              </td>
            </tr>
        });
        
        return (
            <div>
                <table className="myTable">
                    <thead>
                        <tr>
                            <th width="30%">Nome</th>
                            <th width="30%">Descrizione</th>
                            <th width="30%">Azioni</th>
                        </tr>
                    </thead>
                    <tbody>
                        {itemList}
                        <tr>
                          <td><input value={null} type="text" style={{width: "50%", textAlign:"center"}} onChange={ (event) => this.setNewRecipeName(event)}></input></td>
                          <td><input value={null} type="text" style={{width: "50%", textAlign:"center"}} onChange={ (event) => this.setNewRecipeDescription(event)}></input></td>
                          <button onClick={() => this.addRecipe()}>V</button>
                        </tr>
                    </tbody>
                </table>
                <Modal showModal={this.state.showModal} setShowModal={this.setShowModal}>
                  {this.getCurrentComponent()}
                </Modal>
            </div>
        );
    }

    addRecipe() {
      fetch(`/api/recipes`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: this.state.newRecipeName})
        //body: JSON.stringify({name: this.state.newRecipeName, description: this.state.newRecipeDescription})
    }).then(() => {
        //let updatedRecipes = [...this.state.recipes].filter(i => i.recipeID !== id);
        //this.setState({recipes: updatedRecipes});
    });
    }

}
export default Ricette;
