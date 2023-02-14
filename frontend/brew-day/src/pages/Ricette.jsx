import React, { Component } from 'react';
import Modal from "../components/Modal";
import RecipeView from "../components/RecipeView";
import RecipeEdit from "../components/RecipeEdit";
import RecipeDelete from "../components/RecipeDelete";
import RecipeExecute from "../components/RecipeExecute";
import MButton from '../components/MButton';
import { RECIPE_LIST_ENDPOINT, SETTINGS_ENDPOINT, SETTING_LIST_ENDPOINT } from '../Protocol';
import Selector from '../components/Selector';
import RecipeTable from '../components/RecipeTable';
import JimTable from '../components/JimTable';
import ThemeManager from '../components/ThemeManager';
export default class Ricette extends Component {
    constructor(props) {
        super(props);
        this.state = {recipes: [], currentAction: "", nextRecipeQuantity: "", nextRecipeID: "", selectedRecipe: null, showModal:false, newRecipeName: "", newRecipeDescription: "", filterName: "", recipesFiltered: []};
    }

    triggerReload = () => {
        fetch(RECIPE_LIST_ENDPOINT)
        .then(response => response.json())
        .then(recipeIDs => Promise.all(recipeIDs.map(recipeID => fetch(`/api/recipes/${recipeID}`))))
        .then(responses => Promise.all(responses.map(response => response.json())))
        .then(data => this.setState({recipes: data, recipesFiltered: data, newRecipeName: "", newRecipeDescription: ""}));
    }

     triggerReloadSettings = () => {
        fetch(SETTINGS_ENDPOINT + "nextRecipeID")
        .then(response => response.json())
        .then(data => this.setState({nextRecipeID: data.value}))
        .catch((error) => {this.postNextRecipeSetting("nextRecipeID", "");
                          this.setState({nextRecipeID: ""});
                    });
        fetch(SETTINGS_ENDPOINT + "nextRecipeQuantity")
        .then(response => response.json())
        .then(data => this.setState({nextRecipeQuantity: data.value}))
        .catch((error) => {this.postNextRecipeSetting("nextRecipeQuantity", "0");
                          this.setState({nextRecipeQuantity: "0"});
                    });     
    }

    componentDidMount() {
      this.triggerReload();
      this.triggerReloadSettings();
    }

    handleView = (item) => {
      this.setState({currentAction:"view", selectedRecipe:item, showModal:true})
    };

    handleEdit = (item) => {
      this.setState({currentAction:"edit", selectedRecipe:item, showModal:true})
    };    
    
    handleDelete = (item) => {
      this.setState({currentAction:"delete", selectedRecipe:item, showModal:true});
      if(item.recipeID === this.state.nextRecipeID){
        this.updateNextRecipeSetting("nextRecipeID", "");
        this.updateNextRecipeSetting("nextRecipeQuantity", "0");
      }

    };

    handleExecute = (item) => {
      this.setState({currentAction:"execute", selectedRecipe:item, showModal:true})
    };

    closeModal = () => this.setShowModal(false);
    closeModalAndReload = () => {this.closeModal(); this.triggerReload()};

    getCurrentComponent = () => {
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

    setNewRecipeName = (event) => {
      let newRecipeName = event.target.value;
      this.setState({newRecipeName: newRecipeName});
    }

    setFilterName = (event) => {
      let filterName = event.target.value;
      this.setState({filterName: filterName});
    }
  
    setNewRecipeDescription = (event) => {
      let newRecipeDescription = event.target.value;
      this.setState({newRecipeDescription: newRecipeDescription});
    }

    setNewNextRecipeID = (event) => {
      let newNextRecipeID = event.target.value;
      this.setState({nextRecipeID: newNextRecipeID});
      this.updateNextRecipeSetting("nextRecipeID", newNextRecipeID)
    }

    setNewNextRecipeQuantity = (event) => {
      let newNextRecipeQuantity = event.target.value;
      this.setState({nextRecipeQuantity: newNextRecipeQuantity});
    }

    setShowModal = (flag) => {
      if (!flag)
        this.setState({currentAction:""})
      this.setState({showModal:flag})
    }
    
    removeFilter = () => {
      this.setState({recipesFiltered: this.state.recipes, filterName: ""})
    }

    render() {
        const {recipesFiltered, isLoading} = this.state;
        
        if (isLoading) {
            return <p>Caricamento...</p>;
        }
        
        return (
          <ThemeManager>
            <div>
              <JimTable>
                <table style={{width: "100%"}}>
                    <tbody>
                      <tr>
                        <td width="30%">FILTRA PER NOME</td>
                        <td width="50%">
                          <input
                            value={this.state.filterName} type="text"
                            style={{width: "100%", textAlign:"center"}}
                            onChange={ (event) => this.setFilterName(event)}
                          />
                        </td>
                        <td width="20%">
                          <MButton text="Filtra" onClick={() => this.filterRecipe()} />
                          <MButton text="Togli" onClick={() => this.removeFilter()} />
                        </td>
                      </tr>
                      <tr>
                        <td>Seleziona la prossima ricetta</td>
                        <td style={{display:"flex", flexFlow: "column nowrap", justifyContent:"space-around"}}>
                          <Selector
                            label="Recipe"
                            value={this.state.nextRecipeID}
                            onChange={this.setNewNextRecipeID}
                            options={this.state.recipes.map((recipe) => { return {name: recipe.name, value: recipe.recipeID}; })}
                          />
                          <input
                            style={{width: "100%", textAlign:"center"}}
                            value={this.state.nextRecipeQuantity} type="text"
                            onChange={ (event) => this.setNewNextRecipeQuantity(event)}
                          />
                        </td>
                        <td><MButton text="Programma" onClick={() => this.updateNextRecipeSetting("nextRecipeQuantity", this.state.nextRecipeQuantity)}/></td>
                      </tr>
                    </tbody>
                </table>
              </JimTable>

              <RecipeTable
                recipes={recipesFiltered}
                handleView={this.handleView}
                handleEdit={this.handleEdit}
                handleDelete={this.handleDelete}
                handleExecute={this.handleExecute}
                newRecipeName={this.state.newRecipeName}
                newRecipeDescription={this.state.newRecipeDescription}
                setNewRecipeName={this.setNewRecipeName}
                setNewRecipeDescription={this.setNewRecipeDescription}
                addRecipe={this.addRecipe}
                />
              <Modal showModal={this.state.showModal} setShowModal={this.setShowModal}>
                {this.getCurrentComponent()}
              </Modal>
            </div>
          </ThemeManager>
        );
    }

    addRecipe = () => {
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

    filterRecipe = () => {
      fetch(RECIPE_LIST_ENDPOINT + `?name=${this.state.filterName}`)
        .then(response => response.json())
        .then(recipesIDsFiltered => {
          let recipeFiltered = this.state.recipes.filter(recipe => recipesIDsFiltered.includes(recipe.recipeID));
          this.setState({recipesFiltered: recipeFiltered});
        })
    }

    updateNextRecipeSetting = (settingID, value) => {
      fetch(SETTINGS_ENDPOINT + `${settingID}`, {
          method: 'PUT',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({value: value})
      })
    }

    postNextRecipeSetting = (settingID, value) => {
      fetch(SETTING_LIST_ENDPOINT, {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({settingID: settingID, value: value})
      });
    }
}