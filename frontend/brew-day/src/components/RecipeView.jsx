import React from "react";

const RecipeView = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>
      <p>{props.description}</p>
      <table id="recipeView">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Quantità</th>
          </tr>
        </thead>
        <tbody>
          {props.ingredients.map(ingredient => (
            <tr key={ingredient.name}>
              <td>{ingredient.name}</td>
              <td>{ingredient.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecipeView;