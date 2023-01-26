import React, { useState } from "react";
import Modal from "../components/Modal";
import RecipeView from "../components/RecipeView";
import RecipeEdit from "../components/RecipeEdit";
import RecipeDelete from "../components/RecipeDelete";

const Ricette = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentAction, setCurrentAction] = useState("view");
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const [recipes] = useState([
    { id: 1, name: "Ricetta 1", description: "Descrizione della 1 ricetta" },
    { id: 2, name: "Ricetta 2", description: "Descrizione della 2 ricetta" },
  ]);

  const handleView = (id) => {
    setCurrentAction("view");
    setSelectedRecipe(recipes.find((recipe) => recipe.id === id));
    setShowModal(true);
  };

  const handleEdit = (id) => {
    setCurrentAction("edit");
    setSelectedRecipe(recipes.find((recipe) => recipe.id === id));
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setCurrentAction("delete");
    setSelectedRecipe(recipes.find((recipe) => recipe.id === id));
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
                <button onClick={() => handleView(recipe.id)}>
                  Visualizza
                </button>
                <button onClick={() => handleEdit(recipe.id)}>
                  Modifica
                </button>
                <button onClick={() => handleDelete(recipe.id)}>
                  Rimuovi
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        {currentAction === "view" &&
          (selectedRecipe ? (
            <RecipeView
              name={selectedRecipe.name}
              description={selectedRecipe.description}
            />
          ) : (
            <div>Loading...</div>
          ))}
        {currentAction === "edit" &&
          (selectedRecipe ? (
            <RecipeEdit
              name={selectedRecipe.name}
              description={selectedRecipe.description}
            />
          ) : (
            <div>Loading...</div>
          ))}
        {currentAction === "delete" &&
          (selectedRecipe ? (
            <RecipeDelete
              name={selectedRecipe.name}
              description={selectedRecipe.description}
            />
          ) : (
            <div>Loading...</div>
          ))}
      </Modal>
    </div>
  );
};

export default Ricette;
