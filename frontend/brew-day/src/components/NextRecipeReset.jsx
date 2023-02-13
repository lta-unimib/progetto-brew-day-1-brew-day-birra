import React, { Component }  from "react";
import MButton from '../components/MButton';
import { SETTINGS_ENDPOINT } from '../Protocol';

class NextRecipeReset extends Component{
  constructor(props) {
    super(props);
    this.resetNextRecipeSettings = this.resetNextRecipeSettings.bind(this);
    this.updateNextRecipeSetting = this.updateNextRecipeSetting.bind(this);
  }

  render(){
    return (
        <div>
          <center>
            <p>Sei sicuro di voler rimuovere la ricetta?</p>
            <MButton text="Conferma" onClick={() => this.resetNextRecipeSettings()} />
          </center>
        </div>
    );
  }

    resetNextRecipeSettings(){
      this.updateNextRecipeSetting("nextRecipeID", "")
      this.updateNextRecipeSetting("nextRecipeQuantity", "0");
    }
  
    updateNextRecipeSetting(settingID, value) {
      fetch(SETTINGS_ENDPOINT + `${settingID}`, {
          method: 'PUT',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({value: value})
      }).then(() => this.props.onConfirm());
    }

}

export default NextRecipeReset;
