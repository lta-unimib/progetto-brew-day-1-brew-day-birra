import React, { useState } from 'react';
import Ricetta from '../components/Ricetta';

const Recipes = () => {
  const [recipes, setRecipes] = useState([
    { id: 1, name: 'Ricetta 1', description: 'Descrizione della 1 ricetta' },
    { id: 2, name: 'Ricetta 2', description: 'Descrizione della 2 ricetta' },
  ]);

  const handleView = (id) => {
    return <Ricetta />
  };

  const handleEdit = (id) => {
    return <Ricetta />
  };

  const handleDelete = (id) => {
    return <Ricetta />
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Nome ricetta</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {recipes.map((recipe) => (
            <tr key={recipe.id}>
              <td>{recipe.name}</td>
              <td>
                <button onClick={() => handleView(recipe.id)}>Visualizza</button>
                <button onClick={() => handleEdit(recipe.id)}>Modifica</button>
                <button onClick={() => handleDelete(recipe.id)}>Rimuovi</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recipes;
