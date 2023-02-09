import React, { Component } from "react";
import { ThemeProvider } from "@mui/material";
import theme from "../theme/theme";
import MButton from '../components/MButton';

export default class Impostazioni extends Component {

    constructor(props) {
        super(props);
        this.triggerReload = this.triggerReload.bind(this);
        this.updateValue = this.updateValue.bind(this);
        this.fillSetting = this.fillSetting.bind(this);
        this.setNewEquipment = this.setNewEquipment.bind(this);
        this.setNewName = this.setNewName.bind(this);
        this.setNewBackground = this.setNewBackground.bind(this);
        this.setNewColor = this.setNewColor.bind(this);

        this.state = {settings: [], equipment: "", color: "", name: "", background: "",
                      colors: [{"name": "default", "value": "#fcdd2e"}, {"name": "black", "value": "#645F81"}],
                      backgrounds: [{"name": "default", "value": "#fcdd2e"}, {"name": "location1", "value": "#645F81"}]};
    }

    triggerReload() {
        fetch("/api/settings")
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
                        console.log("qui");
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

    fillSetting(){
      let data = this.state.settings;
      
    }

    setNewEquipment(event){
      let newEquipment = event.target.value;
      this.setState({equipment: newEquipment});
    }

    setNewName(event){
      let newName = event.target.value;
      this.setState({name: newName});
    }

    setNewBackground(event){
      let newBackground = event.target.value;
      this.setState({background: newBackground});
      this.updateValue("background", newBackground)
    }

    setNewColor(event){
      let newColor = event.target.value;
      this.setState({color: newColor});
      this.updateValue("color", newColor)
    }

    componentDidMount() {
      this.triggerReload();
    }

    render(){
      return (
        <ThemeProvider theme={theme}>
            <div>
                <table className="myTable">
                    <tbody>
                        <tr>
                          <td>Equipaggiamento Disponibile</td>
                          <td><input value={this.state.equipment} type="text" style={{width: "90%", textAlign:"center"}} onChange={ (event) => this.setNewEquipment(event)}></input></td>
                          <td><MButton text="Aggiorna" onClick={() => this.updateValue("equipment", this.state.equipment)} /></td>
                        </tr>
                    </tbody>
                </table>
                <table className="myTable">
                    <tbody>
                        <tr>
                          <td>Inserisci qui il tuo nome</td>
                          <td><input value={this.state.name} type="text" style={{width: "90%", textAlign:"center"}} onChange={ (event) => this.setNewName(event)}></input></td>
                          <td><MButton text="Aggiorna" onClick={() => this.updateValue("name", this.state.name)} /></td>
                        </tr>
                    </tbody>
                </table>
                <table className="myTable">
                    <tbody>
                        <tr>
                          <td>Seleziona il colore del tema dell'applicazione</td>
                          <td>
                            <select
                              value={this.state.color}
                              style={{ width: "90%", textAlign: "center" }}
                              onChange={(event) => this.setNewColor(event)} 
                            >
                              {this.state.colors.map((color) => (
                                <option value={color.value} key={color.name}>
                                  {color.name}
                                </option>
                              ))}
                            </select>
                          </td>
                        </tr>
                    </tbody>
                </table>
                <table className="myTable">
                    <tbody>
                        <tr>
                          <td>Seleziona la location</td>
                          <td>
                              <select
                                  value={this.state.background}
                                  style={{ width: "90%", textAlign: "center" }}
                                  onChange={(event) => this.setNewBackground(event)} 
                                >
                                  {this.state.backgrounds.map((background) => (
                                    <option value={background.value} key={background.name}>
                                      {background.name}
                                    </option>
                                  ))}
                              </select>
                          </td>
                        </tr>
                    </tbody>
                </table>
            </div>
          </ThemeProvider>
        )

    }

    updateValue(id, newValue) {
      fetch(`/api/settings/${id}`, {
          method: 'PUT',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({value: newValue})
      })
      .then(() => {
        this.triggerReload();
      });
    }

    postValue(id, newValue) {
      fetch(`/api/settings`, {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({settingID: id, value: newValue})
      });
    } 

}
