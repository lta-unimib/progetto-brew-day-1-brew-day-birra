import React, { Component } from 'react';
import Modal from "../components/Modal";
import RecipeView from "../components/RecipeView";
import RecipeEdit from "../components/RecipeEdit";
import RecipeDelete from "../components/RecipeDelete";

export default class Ricette extends Component {
    constructor(props) {
        super(props);
        this.state = {recipes: [], currentAction: "view", selectedRecipe: null, showModal:false, newRecipeName: null, newRecipeDescription: null, filterName: null, recipesFiltered: []};
        this.handleView = this.handleView.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.getCurrentComponent = this.getCurrentComponent.bind(this);
        this.setShowModal = this.setShowModal.bind(this);
        this.filterRecipe = this.filterRecipe.bind(this);
    }

    componentDidMount() {
        fetch("/api/recipes")
        .then(response => response.json())
        .then(recipeIDs => Promise.all(recipeIDs.map(recipeID => fetch(`api/recipes/${recipeID}`))))
        .then(responses => Promise.all(responses.map(response => response.json())))
        .then(data => this.setState({recipes: data, recipesFiltered: data}));
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
          return <RecipeDelete recipeID={selectedRecipe.recipeID} name={selectedRecipe.name} description={selectedRecipe.description} ingredients={selectedRecipe.ingredients} />;
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

    setFilterName(event){
      let filterName = event.target.value;
      this.setState({filterName: filterName});
    }
  
    setNewRecipeDescription(event){
      let newRecipeDescription = event.target.value;
      this.setState({newRecipeDescription: newRecipeDescription});
    }

    setShowModal(flag){
      this.setState({showModal:flag})
    }
    
    render() {
        const {recipesFiltered: recipesFiltered, isLoading} = this.state;
        
        if (isLoading) {
            return <p>Caricamento...</p>;
        }
        
        const itemList = recipesFiltered.map(item => {
            return <tr key={item.recipeID}>
              <td>{item.name}</td>
              <td>{item.description}</td>
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
                            <th width="30%">FILTRA PER NOME</th>
                            <th width="50%"><input value={null} type="text" style={{width: "90%", textAlign:"center"}} onChange={ (event) => this.setFilterName(event)}></input></th>
                            <th width="10%"> <button onClick={() => this.filterRecipe()}>FILTRA</button></th>
                        </tr>
                        <tr>
                            <th width="30%">Nome</th>
                            <th width="50%">Descrizione</th>
                            <th width="10%">Azioni</th>
                        </tr>
                    </thead>
                    <tbody>
                        {itemList}
                        <tr>
                          <td><input value={null} type="text" style={{width: "90%", textAlign:"center"}} onChange={ (event) => this.setNewRecipeName(event)}></input></td>
                          <td><input value={null} type="text" style={{width: "90%", textAlign:"center"}} onChange={ (event) => this.setNewRecipeDescription(event)}></input></td>
                          <td><button onClick={() => this.addRecipe()}>V</button></td>
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
        body: JSON.stringify({name: this.state.newRecipeName, description: this.state.newRecipeDescription})
    })
    }

    filterRecipe() {
      fetch(`/api/recipes?nameFilter=${this.state.filterName}`)
        .then(response => response.json())
        .then(recipesIDsFiltered => {
          let recipeFiltered = this.state.recipes.filter(recipe => recipesIDsFiltered.includes(recipe.name));
          this.setState({recipesFiltered: recipeFiltered});
        })
    }
}
