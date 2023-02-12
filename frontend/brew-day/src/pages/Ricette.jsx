import React, { Component } from 'react';
import Modal from "../components/Modal";
import RecipeView from "../components/RecipeView";
import RecipeEdit from "../components/RecipeEdit";
import RecipeDelete from "../components/RecipeDelete";
import RecipeExecute from "../components/RecipeExecute";
import { ThemeProvider } from "@mui/material";
import theme from "../theme/theme";
import MButton from '../components/MButton';
import { RECIPE_LIST_ENDPOINT, SETTINGS_ENDPOINT, SETTING_LIST_ENDPOINT } from '../Protocol';

export default class Ricette extends Component {
    constructor(props) {
        super(props);
        this.state = {recipes: [], currentAction: "", nextRecipeID: "", selectedRecipe: null, showModal:false, newRecipeName: "", newRecipeDescription: "", filterName: "", recipesFiltered: []};
        this.handleView = this.handleView.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleExecute = this.handleExecute.bind(this);
        this.getCurrentComponent = this.getCurrentComponent.bind(this);
        this.setShowModal = this.setShowModal.bind(this);
        this.filterRecipe = this.filterRecipe.bind(this);
        this.triggerReload = this.triggerReload.bind(this);
        this.triggerReloadSettings = this.triggerReloadSettings.bind(this);

    }

    triggerReload() {
        fetch(RECIPE_LIST_ENDPOINT)
        .then(response => response.json())
        .then(recipeIDs => Promise.all(recipeIDs.map(recipeID => fetch(`/api/recipes/${recipeID}`))))
        .then(responses => Promise.all(responses.map(response => response.json())))
        .then(data => this.setState({recipes: data, recipesFiltered: data, newRecipeName: "", newRecipeDescription: ""}));
    }

     triggerReloadSettings() {
        fetch(SETTINGS_ENDPOINT + "nextRecipeID")
        .then(response => response.json())
        .then(data => this.setState({nextRecipeID: data.value}))
        .catch((error) => {this.postNextRecipeID();
                          this.setState({nextRecipeID: ""});
                    });
    }

    componentDidMount() {
      this.triggerReload();
      this.triggerReloadSettings();
    }

    handleView(item) {
      this.setState({currentAction:"view", selectedRecipe:item, showModal:true})
    };

    handleEdit(item) {
      this.setState({currentAction:"edit", selectedRecipe:item, showModal:true})
    };    
    
    handleDelete(item) {
      this.setState({currentAction:"delete", selectedRecipe:item, showModal:true});
      if(item.recipeID === this.state.nextRecipeID)
        this.updateNextRecipeID("");
    };

    handleExecute(item) {
      this.setState({currentAction:"execute", selectedRecipe:item, showModal:true})
    };

    closeModal = () => this.setShowModal(false);
    closeModalAndReload = () => {this.closeModal(); this.triggerReload()};

    getCurrentComponent(){
      let selectedRecipe = this.state.selectedRecipe;
      let currentAction = this.state.currentAction;
      if (!selectedRecipe) return <div>Caricamento...</div>;
      switch (currentAction) {
        case "view":
          return <RecipeView recipeID={selectedRecipe.recipeID}/>;
        case "edit":
          return <RecipeEdit recipeID={selectedRecipe.recipeID} onConfirm={this.triggerReload}/>;
        case "delete":
          return <RecipeDelete recipeID={selectedRecipe.recipeID} onConfirm={this.closeModalAndReload}/>;
        case "execute":
          return <RecipeExecute recipeID={selectedRecipe.recipeID} onConfirm={this.closeModal}/>;
        default:
          return <div></div>;
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

    setNewNextRecipeID(event){
      let newNextRecipeID = event.target.value;
      this.setState({nextRecipeID: newNextRecipeID});
      this.updateNextRecipeID(newNextRecipeID);
    }

    setShowModal(flag) {
      if (!flag)
        this.setState({currentAction:""})
      this.setState({showModal:flag})
    }
    
    removeFilter(){
      this.setState({recipesFiltered: this.state.recipes, filterName: ""})
    }

    render() {
        const {recipesFiltered, isLoading} = this.state;
        
        if (isLoading) {
            return <p>Caricamento...</p>;
        }
        
        const itemList = recipesFiltered.map(item => {
            return <tr key={item.recipeID}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>
                <MButton text="Dettagli" onClick={() => this.handleView(item)} />
                <MButton text="Esegui" onClick={() => this.handleExecute(item)} />
                <MButton text="Modifica" onClick={() => this.handleEdit(item)} />
                <MButton text="Elimina" onClick={() => this.handleDelete(item)} />
              </td>
            </tr>
        });
        
        return (
          <ThemeProvider theme={theme}>
            <div>

                <table className="myTable">
                    <tbody>
                        <tr>
                          <td>Seleziona la prossima ricetta che vorresti eseguire</td>
                          <td>
                              <select
                                  value={this.state.nextRecipeID}
                                  style={{ width: "90%", textAlign: "center" }}
                                  onChange={(event) => this.setNewNextRecipeID(event)} 
                                >
                                  <option value="" key="">
                                      --seleziona una ricetta--
                                  </option>
                                  {this.state.recipes.map((recipe) => (
                                    <option value={recipe.recipeID} key={recipe.recipeID}>
                                      {recipe.name}
                                    </option>
                                  ))}
                              </select>
                          </td>
                        </tr>
                    </tbody>
                </table>

                <table className="myTable">
                    <thead>
                        <tr>
                            <th width="30%">FILTRA PER NOME</th>
                            <th width="50%"><input value={this.state.filterName} type="text" style={{width: "90%", textAlign:"center"}} onChange={ (event) => this.setFilterName(event)}></input></th>
                            <th width="20%"><MButton text="Filtra" onClick={() => this.filterRecipe()} />
                                            <MButton text="Togli" onClick={() => this.removeFilter()} />
                            </th>
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
                          <td><input value={this.state.newRecipeName} type="text" style={{width: "90%", textAlign:"center"}} onChange={ (event) => this.setNewRecipeName(event)}></input></td>
                          <td><input value={this.state.newRecipeDescription} type="text" style={{width: "90%", textAlign:"center"}} onChange={ (event) => this.setNewRecipeDescription(event)}></input></td>
                          <td><MButton text="Aggiungi" onClick={() => this.addRecipe()} /></td>
                        </tr>
                    </tbody>
                </table>
                <Modal showModal={this.state.showModal} setShowModal={this.setShowModal}>
                  {this.getCurrentComponent()}
                </Modal>
            </div>
          </ThemeProvider>
        );
    }

    addRecipe() {
      fetch(RECIPE_LIST_ENDPOINT, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: this.state.newRecipeName, description: this.state.newRecipeDescription})
      })
      .then(() => this.triggerReload());
    }

    filterRecipe() {
      fetch(RECIPE_LIST_ENDPOINT + `?name=${this.state.filterName}`)
        .then(response => response.json())
        .then(recipesIDsFiltered => {
          let recipeFiltered = this.state.recipes.filter(recipe => recipesIDsFiltered.includes(recipe.recipeID));
          this.setState({recipesFiltered: recipeFiltered});
        })
    }

    updateNextRecipeID(newNextRecipeID) {
      fetch(SETTINGS_ENDPOINT + `nextRecipeID`, {
          method: 'PUT',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({value: newNextRecipeID})
      })
    }

    postNextRecipeID() {
      fetch(SETTING_LIST_ENDPOINT, {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({settingID: "nextRecipeID", value: ""})
      });
    }
}