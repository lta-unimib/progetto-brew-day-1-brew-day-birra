import React from "react";

export default class RecipeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: "", description: "", ingredients: []};
      this.triggerReload = this.triggerReload.bind(this);
  }

  triggerReload() {
      fetch(`/api/recipes/${this.props.recipeID}`)
      .then(response => response.json())
      .then(data => this.setState({...data}));
  }

  componentDidMount() {
    this.triggerReload();
  }

  render() {
    const itemList = this.state.ingredients.map((item) => {
      return (
        <tr key={item.name}>
          <td>
            <img
              className="shoppingImage"
              src={`../../icons/inventory-icons/${item.name}.png`}
              alt={item.name}
              onError={(e) => {
                e.target.src = "../../icons/inventory-icons/sconosciuto.png";
              }}
            />
          </td>
          <td>{item.name}</td>
          <td>{item.quantity}</td>
        </tr>
      );
    });

    return (
      <div>
        <center>
          <h1> {this.state.name}</h1>
          <p> {this.state.description} </p>
          <table className="myTable">
            <thead>
              <tr>
                <th width="25%">Immagine</th>
                <th width="25%">Nome</th>
                <th width="25%">Quantità</th>
              </tr>
            </thead>
            <tbody>{itemList}</tbody>
          </table>
        </center>
      </div>
    );
  }
};

