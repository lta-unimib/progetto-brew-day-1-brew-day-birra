import React, { Component } from 'react';
import Modal from "../components/Modal";
import RecipeView from "../components/RecipeView";
import RecipeEdit from "../components/RecipeEdit";
import RecipeDelete from "../components/RecipeDelete";


class Ricette extends Component {

    constructor(props) {
        super(props);
        this.state = {recipes: [], currentAction: "view", selectedRecipe: null, showModal:false };
        this.deleteRecipe = this.deleteRecipe.bind(this);
        this.handleView = this.handleView.bind(this);
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
                <button onClick={() => this.deleteRecipe(item.recipeID)}>Elimina</button>
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
                    </tbody>
                </table>
                <Modal showModal={this.state.showModal} setShowModal={this.setShowModal}>
                  {this.getCurrentComponent()}
                </Modal>
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
        }).then(() => {
            let updatedRecipes = [...this.state.recipes].filter(i => i.recipeID !== id);
            this.setState({recipes: updatedRecipes});
        });
    }



}
export default Ricette;
