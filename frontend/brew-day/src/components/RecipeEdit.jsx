import React from "react";

class RecipeEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      description: props.description,
      buttonClicked: false,
    };
  }

  render() {
    return (
      <div>
        {!this.state.buttonClicked ? (
          <div>
            <div id="recipeEditDiv">
              <p>Nome:</p>
              <textarea
                id="nameTextArea"
                value={this.state.name}
                onChange={this.nameTextChanged}
              ></textarea>
              <p>Descrizione:</p>
              <textarea
                id="descriptionTextArea"
                value={this.state.description}
                onChange={this.descriptionTextChanged}
              ></textarea>
              <br></br>
              <table className="recipeView">
                <thead>
                  <tr>
                    <th>Ingrediente</th>
                    <th>Quantità</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <p>Acqua</p>
                    </td>
                    <td>
                      <textarea></textarea>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>Additivi</p>
                    </td>
                    <td>
                      <textarea></textarea>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>Lievito</p>
                    </td>
                    <td>
                      <textarea></textarea>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>Luppoli</p>
                    </td>
                    <td>
                      <textarea></textarea>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>Malto</p>
                    </td>
                    <td>
                      <textarea></textarea>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>Zuccheri</p>
                    </td>
                    <td>
                      <textarea></textarea>
                    </td>
                  </tr>
                </tbody>
              </table>
              <button
                onClick={() => {
                  this.setState({
                    buttonClicked: true,
                  });
                }}
              >
                Modifica ricetta
              </button>
            </div>
          </div>
        ) : (
          <p>Ricetta modificata correttamente</p>
        )}
      </div>
    );
  }
}

export default RecipeEdit;