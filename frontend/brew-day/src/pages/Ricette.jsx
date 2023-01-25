import React, { useState } from 'react';
import Modal from '../components/Modal';
import RecipeView from '../components/RecipeView';
import RecipeEdit from '../components/RecipeEdit';
import RecipeDelete from '../components/RecipeDelete';

const Ricette = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentAction, setCurrentAction] = useState("view");

  const [recipes, setRecipes] = useState([
    { id: 1, name: 'Ricetta 1', description: 'Descrizione della 1 ricetta' },
    { id: 2, name: 'Ricetta 2', description: 'Descrizione della 2 ricetta' },
  ]);

  const handleView = (id) => {
    setCurrentAction("view");
    setShowModal(true);
  };

  const handleEdit = (id) => {
    setCurrentAction("edit");
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setCurrentAction("delete");
    setShowModal(true);
  };

  return (
    <div>
      <table className="myTable">
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
              <button onClick={() => handleView(recipe.id, setShowModal)}>Visualizza</button>
              <button onClick={() => handleEdit(recipe.id, setShowModal)}>Modifica</button>
              <button onClick={() => handleDelete(recipe.id, setShowModal)}>Rimuovi</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        {currentAction === "view" && <RecipeView />}
        {currentAction === "edit" && <RecipeEdit />}
        {currentAction === "delete" && <RecipeDelete />}
      </Modal>
    </div>
  );
};

export default Ricette;