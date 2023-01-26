import React, { useState } from "react";
import Modal from "../components/Modal";
import RecipeView from "../components/RecipeView";
import RecipeEdit from "../components/RecipeEdit";
import RecipeDelete from "../components/RecipeDelete";
import RecipeExecute from "../components/RecipeExecute";

const Ricette = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentAction, setCurrentAction] = useState("view");
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const [recipes] = useState([
    { id: 1, name: "Ricetta 1", description: "Descrizione della 1 ricetta", 
      ingredients: [{"name": "acqua", "quantity": "17.0"}, 
                    {"name": "malto", "quantity": "1.0"},
                    {"name": "luppoli", "quantity": "2"}]},
    { id: 2, name: "Ricetta 2", description: "Descrizione della 2 ricetta", 
      ingredients: [{"name": "acqua", "quantity": "17.0"},
                    {"name": "luppoli", "quantity": "3"}]},
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

  const handleExecute = (id) => {
    setCurrentAction("execute");
    setSelectedRecipe(recipes.find((recipe) => recipe.id === id));
    setShowModal(true);
  };

  const getCurrentComponent = (currentAction, selectedRecipe) => {
    if (!selectedRecipe) return <div>Caricamento...</div>;
    switch (currentAction) {
      case "view":
        return <RecipeView name={selectedRecipe.name} description={selectedRecipe.description} ingredients={selectedRecipe.ingredients} />;
      case "edit":
        return <RecipeEdit name={selectedRecipe.name} description={selectedRecipe.description} ingredients={selectedRecipe.ingredients} />;
      case "delete":
        return <RecipeDelete name={selectedRecipe.name} description={selectedRecipe.description} ingredients={selectedRecipe.ingredients} />;
      case "execute":
        return <RecipeExecute name={selectedRecipe.name} description={selectedRecipe.description} ingredients={selectedRecipe.ingredients} />;
      default:
        return null;
    }
  }

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
                <button onClick={() => handleExecute(recipe.id)}>
                  Esegui
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        {getCurrentComponent(currentAction, selectedRecipe)}
      </Modal>
    </div>
  );
};

export default Ricette;