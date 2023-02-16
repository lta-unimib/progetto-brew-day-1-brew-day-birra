import React, { Component } from 'react';
import Modal from "../components/Modal";
import RecipeView from "../components/RecipeView";
import RecipeEdit from "../components/RecipeEdit";
import RecipeDelete from "../components/RecipeDelete";
import RecipeExecute from "../components/RecipeExecute";
import MButton from '../components/MButton';
import { FAKE_NOTIFIER, isNotValidPositiveQuantity, RECIPE_LIST_ENDPOINT, SETTINGS_ENDPOINT, SETTING_LIST_ENDPOINT } from '../utils/Protocol';
import Selector from '../components/Selector';
import RecipeTable from '../components/RecipeTable';
import JimTable from '../components/JimTable';
import BodyThemeManager from '../components/BodyThemeManager';
import QuantityInput from '../components/QuantityInput';
import { TextField } from '@mui/material';
import JimFlex from '../components/JimFlex';
import JimGrid from '../components/JimGrid';
export default class Ricette extends Component {
    constructor(props) {
        super(props);
        this.state = {
          recipes: [], currentAction: "", 
          nextRecipeQuantity: "", nextRecipeID: "", 
          selectedRecipe: null, showModal:false, 
          newRecipeName: "", newRecipeDescription: "", 
          filterName: "", recipesFiltered: []
        };
        this.notifier = this.props.notifier || FAKE_NOTIFIER;
    }

    triggerReload = () => {
        fetch(RECIPE_LIST_ENDPOINT)
        .then(response => response.json())
        .then(recipeIDs => Promise.all(recipeIDs.map(recipeID => fetch(`/api/recipes/${recipeID}`))))
        .then(responses => Promise.all(responses.map(response => response.json())))
        .then(data => this.setState({recipes: data, recipesFiltered: data, newRecipeName: "", newRecipeDescription: ""}))
        .catch(this.notifier.connectionError)
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
          return <RecipeView notifier={this.notifier} recipeID={selectedRecipe.recipeID}/>;
        case "edit":
          return <RecipeEdit notifier={this.notifier} recipeID={selectedRecipe.recipeID} onConfirm={this.triggerReload}/>;
        case "delete":
          return <RecipeDelete notifier={this.notifier} recipeID={selectedRecipe.recipeID} onConfirm={this.closeModalAndReload}/>;
        case "execute":
          return <RecipeExecute notifier={this.notifier} recipeID={selectedRecipe.recipeID} onConfirm={this.closeModal}/>;
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

    programRecipe = () => {
      if (this.state.nextRecipeID === "")
        return this.notifier.warning("devi selezionare una ricetta per impostarla")
      if (isNotValidPositiveQuantity(this.state.nextRecipeQuantity))
        return this.notifier.warning("devi inserire una quantita' maggiore di zero")
      this.updateNextRecipeSetting("nextRecipeID", this.state.nextRecipeID)
      .then(() => this.updateNextRecipeSetting("nextRecipeQuantity", this.state.nextRecipeQuantity))
      .then(() => this.notifier.success("programmazione ricetta impostata correttamente"))
      .catch(this.notifier.connectionError)
    }

    render() {
        const {recipesFiltered, isLoading} = this.state;
        
        if (isLoading) {
            return <p>Caricamento...</p>;
        }
        
        return (
          <BodyThemeManager>
            <div>
              <JimFlex>
                <JimTable>
                  <p style={{textAlign:"center"}}>FILTRA PER NOME</p>
                  <TextField
                    label="Name"
                    value={this.state.filterName} type="text"
                    style={{
                      marginRight:"5%", marginLeft:"5%",
                      marginTop:"1%", marginBottom:"1%",
                      width: "90%", textAlign:"center"}}
                    onChange={this.setFilterName}
                  />
                  <JimGrid>
                    <MButton text="Filtra" onClick={this.filterRecipe}/>
                  </JimGrid>
                  <JimGrid>
                    <MButton text="Togli" onClick={this.removeFilter}/>
                  </JimGrid>
                </JimTable>
                <JimTable>
                  <p style={{textAlign:"center"}}>Seleziona la prossima ricetta</p>
                  <JimGrid>
                    <Selector optional
                      label="Recipe"
                      value={this.state.nextRecipeID}
                      onChange={this.setNewNextRecipeID}
                      options={this.state.recipes.map((recipe) => { return {name: recipe.name, value: recipe.recipeID}; })}
                    />
                  </JimGrid>
                  <JimGrid>
                    <QuantityInput
                      label="Quantity"
                      value={this.state.nextRecipeQuantity}
                      onChange={this.setNewNextRecipeQuantity}
                    />
                  </JimGrid>
                  <JimGrid>
                    <MButton text="Programma" onClick={this.programRecipe}/>
                  </JimGrid>
                </JimTable>
              </JimFlex>

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
          </BodyThemeManager>
        );
    }

    addRecipe = () => {
      if (this.state.newRecipeName === "")
        return this.notifier.warning("il nome della ricetta non deve essere vuoto");
      fetch(RECIPE_LIST_ENDPOINT, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: this.state.newRecipeName, description: this.state.newRecipeDescription})
      })
      .then(this.notifier.onRequestError("impossibile creare la ricetta"))
      .then(this.notifier.onRequestSuccess("ricetta creata correttamente"))
      .then(() => this.triggerReload());
    }

    filterRecipe = () => {
      fetch(RECIPE_LIST_ENDPOINT + `?name=${this.state.filterName}`)
      .then(response => response.json())
      .then(recipesIDsFiltered => {
        let recipeFiltered = this.state.recipes.filter(recipe => recipesIDsFiltered.includes(recipe.recipeID));
        this.setState({recipesFiltered: recipeFiltered});
      })
      .catch(this.notifier.connectionError);
    }

    updateNextRecipeSetting = (settingID, value) => {
      return new Promise((acc, rej) => {
        fetch(SETTINGS_ENDPOINT + `${settingID}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({value: value})
        })
        .then(this.notifier.onRequestErrorResolvePromise(() => {}, acc, rej))
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
      })
      .then(this.notifier.onRequestError("verificare la connessione"))
    }
}