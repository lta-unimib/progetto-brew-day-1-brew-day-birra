package unimib.ingsof.logic;

import java.util.Map;
import java.util.TreeMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import unimib.ingsof.exceptions.DoesntExistsException;
import unimib.ingsof.exceptions.InsufficientEquipmentException;
import unimib.ingsof.exceptions.InternalServerException;
import unimib.ingsof.exceptions.NotEnoughIngredientsException;
import unimib.ingsof.exceptions.ValidationException;
import unimib.ingsof.exceptions.WrongIDGenerationInitialization;
import unimib.ingsof.persistence.service.Protocol;
import unimib.ingsof.persistence.view.RecipeIngredientView;
import unimib.ingsof.persistence.view.RecipeView;

@Service
public class ExecuteRecipeController {
	@Autowired
	RecipeController recipeController;
	@Autowired
	InventoryIngredientController inventoryIngredientController;
	@Autowired
	ShoppingController shoppingController;

	public void execute(String recipeID, float multiplier) throws DoesntExistsException, InternalServerException, InsufficientEquipmentException, ValidationException, WrongIDGenerationInitialization, NotEnoughIngredientsException {
		if (!shoppingController.getShoppingList(recipeID, multiplier).isEmpty()) 
			throw new NotEnoughIngredientsException();
		RecipeView recipe = recipeController.getRecipeByID(recipeID);
		for (RecipeIngredientView recipeIngredient : recipe.getIngredients()) {
			String ingredientID = recipeIngredient.getIngredientID();
			float inventoryIngredientQuantity = inventoryIngredientController.getIngredient(ingredientID).getQuantity();
			float recipeIngredientQuantity =  multiplier * recipeIngredient.getQuantity();
			Map<String, String> ingredientObject = new TreeMap<>();
			ingredientObject.put(Protocol.QUANTITY_BODY_KEY,  Float.toString(inventoryIngredientQuantity-recipeIngredientQuantity));				
			inventoryIngredientController.updateIngredient(ingredientID, ingredientObject);
		}		
	}
}