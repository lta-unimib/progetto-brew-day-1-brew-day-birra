import React, { Component } from "react";
import themes from "../theme/themes";
import backgrounds from '../theme/backgrounds';
import ThemeManager from "../components/ThemeManager";
import Modal from "../components/Modal";
import MButton from '../components/MButton';
import SettingsReset from "../components/SettingsReset";
import NextRecipeReset from "../components/NextRecipeReset";
import {SETTING_LIST_ENDPOINT, SETTINGS_ENDPOINT} from '../Protocol';
import InputFieldSetting from "../components/InputFieldSetting";
import InputSelectorSetting from "../components/InputSelectorSetting";
import JimTable from "../components/JimTable";
import JimFlex from "../components/JimFlex";

export default class Impostazioni extends Component {

    constructor(props) {
        super(props);
        this.state = {
          currentAction: "",
          showModal:false, settings: [], equipment: "", color: "", name: "", background: "",
          colors: Object.keys(themes).map((key) => { return {name:key, value:key}; }),
          backgrounds: Object.keys(backgrounds).map((key) => { return {name:key, value:key}; })
        };
    }

    triggerReload = () => {
        fetch(SETTING_LIST_ENDPOINT)
        .then(response => response.json())
        .then(data => {this.setState({settings: data});
                      if (data.filter(i => i.settingID === "color").length === 0){
                        this.postValue("color", "default");
                        this.setState({color: "default"});
                      } else {
                        this.setState({color: data.filter(i => i.settingID === "color")[0].value});
                      }
                      if (data.filter(i => i.settingID === "name").length === 0){
                        this.postValue("name", " ");
                        this.setState({name: " "});
                      } else {
                        this.setState({name: data.filter(i => i.settingID === "name")[0].value});
                      }
                      if (data.filter(i => i.settingID === "background").length === 0){
                        this.postValue("background", "default");
                        this.setState({background:"default"});
                      } else {
                        this.setState({background: data.filter(i => i.settingID === "background")[0].value});
                      }
                      if (data.filter(i => i.settingID === "equipment").length === 0){
                        this.postValue("equipment", "30");
                        this.setState({equipment: "30"});
                      } else {
                        this.setState({equipment: data.filter(i => i.settingID === "equipment")[0].value});
                      }
      })
    }

    setNewEquipment = (event) => {
      let newEquipment = event.target.value;
      this.setState({equipment: newEquipment});
    }

    setNewName = (event) => {
      let newName = event.target.value;
      this.setState({name: newName});
    }

    setNewBackground = (event) => {
      let newBackground = event.target.value;
      this.setState({background: newBackground});
      this.updateValue("background", newBackground).then(() => document.cookie="backgroundReload=true").then(this.triggerReload)
    }

    setNewColor = (event) => {
      let newColor = event.target.value;
      this.setState({color: newColor});
      this.updateValue("color", newColor).then(() => document.cookie="themeReload=true").then(this.triggerReload)
    }

    componentDidMount = () => {
      this.triggerReload();
    }

    closeModal = () => this.setShowModal(false);
    closeModalAndReload = () => {this.closeModal(); this.triggerReload()};

    handleResetSettings = () => {
      this.setState({currentAction:"resetSettings", showModal:true})
    };  

    handleResetNextRecipeID = () => {
      this.setState({currentAction:"resetRecipeID", showModal:true})
    }; 

    getCurrentComponent = () => {
      let currentAction = this.state.currentAction;
      switch (currentAction) {
        case "resetSettings":
          return <SettingsReset onConfirm={this.closeModalAndReload}/>;
        case "resetRecipeID":
          return <NextRecipeReset onConfirm={this.closeModal}/>;
        default:
          return <div></div>;
      }
    }    


    setShowModal = (flag) => {
      if (!flag)
        this.setState({currentAction:""})
      this.setState({showModal:flag})
    }

    render(){
      return (
        <ThemeManager>
            <JimFlex>
              <InputFieldSetting
                value={this.state.equipment}
                title="Equipaggiamento Disponibile"
                onChange={(event) => this.setNewEquipment(event)}
                onConfirm={() => this.updateValue("equipment", this.state.equipment).then(this.triggerReload)}
              />
              <InputFieldSetting
                value={this.state.name}
                title="Inserisci qui il tuo nome"
                onChange={(event) => this.setNewName(event)}
                onConfirm={() => this.updateValue("name", this.state.equipment).then(this.triggerReload)}
              />
              <InputSelectorSetting
                title="Seleziona il colore del tema"
                label="Color"
                value={this.state.color}
                onChange={this.setNewColor}
                options={this.state.colors}
              />
              <InputSelectorSetting
                title="Seleziona lo sfondo"
                label="Background"
                value={this.state.background}
                onChange={this.setNewBackground}
                options={this.state.backgrounds}
              />
              <JimTable>
                <MButton center text="Elimina tutti i dati" onClick={() => this.handleResetSettings()}/>
              </JimTable>
              <JimTable>
                <MButton center text="Resetta la prossima ricetta da eseguire" onClick={() => this.handleResetNextRecipeID()}/>
              </JimTable>
            </JimFlex>
            <Modal showModal={this.state.showModal} setShowModal={this.setShowModal}>
              {this.getCurrentComponent()}
            </Modal>
          </ThemeManager>
        )

    }

    updateValue = (id, newValue) => {
      return new Promise((acc, rej) => {
        fetch(SETTINGS_ENDPOINT+`${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({value: newValue})
        })
        .then(() => acc())
      })
    }

    postValue = (id, newValue) => {
      return new Promise((acc, rej) => {
        fetch(SETTING_LIST_ENDPOINT, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({settingID: id, value: newValue})
        })
        .then(() => acc());
      })
    }

}
