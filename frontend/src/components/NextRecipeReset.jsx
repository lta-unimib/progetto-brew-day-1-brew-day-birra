import React, { Component }  from "react";
import MButton from '../components/MButton';
import { FAKE_NOTIFIER, SETTINGS_ENDPOINT } from '../utils/Protocol';

class NextRecipeReset extends Component{
  constructor(props) {
    super(props);
    this.notifier = this.props.notifier || FAKE_NOTIFIER;
  }

  render(){
    return (
        <div>
          <center>
            <p>Sei sicuro di voler rimuovere la ricetta?</p>
            <MButton text="Conferma" onClick={this.resetNextRecipeSettings} />
          </center>
        </div>
    );
  }

  resetNextRecipeSettings = () => {
    this.updateNextRecipeSetting("nextRecipeID", "")
    .then(() => this.updateNextRecipeSetting("nextRecipeQuantity", "0"))
    .then(() => this.notifier.success("programmazione cancellata con successo"))
    .then(() => this.props.onConfirm())
    .catch(() => this.notifier.error("impossibile cancellare la programmazione"))
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
      .then(response => {
        if (response.status >= 400 && response.status < 600)
          throw new Error();
      })
      .then(() => acc())
      .catch(() => rej())
    })
  }
}

export default NextRecipeReset;
