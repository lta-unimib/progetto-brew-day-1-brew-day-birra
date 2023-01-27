import React from "react";

const RecipeEdit = (props) => {

  const itemList = props.ingredients.map(item => {
    return <tr key={item.name}>
        <td>{item.name}</td>
        <td><input value={item.quantity} type="text" style={{width: "50%", textAlign:"center"}}></input></td>
        <td>
            <button onClick={() => this.handleEdit(item)}>V</button>
            <button onClick={() => this.deleteRecipe(item.recipeID)}>X</button>
          </td>
      </tr>
  });

  return (
    <div>
      <center>
      <table className="myTable">
          <tbody> 
            <tr>
              <td> <p>Nome Ricetta:</p> </td>
              <td><input id="nameTextArea" value={props.name} style={{width: "80%"}}></input></td>
              <td><button onClick={() => this.handleEdit()}>V</button></td>        
            </tr>
          </tbody>
        </table>
        <table className="myTable">
          <tbody> 
            <tr>
                <td><p>Descrizione:</p></td>
                <td><textarea id="descriptionTextArea" value={props.description} style={{width: "80%"}}></textarea></td>
                <td><button onClick={() => this.handleEdit()}>V</button></td>    
            </tr>
          </tbody>
        </table>
        
        <table className="myTable">
          <thead>
            <tr>
              <th width="30%">Nome</th>
              <th width="30%">Quantità</th>
              <th width="30%">Azioni</th>
            </tr>
          </thead>
          <tbody>
            {itemList}
          </tbody>
        </table>
      </center>
    </div>
  );


};


export default RecipeEdit;