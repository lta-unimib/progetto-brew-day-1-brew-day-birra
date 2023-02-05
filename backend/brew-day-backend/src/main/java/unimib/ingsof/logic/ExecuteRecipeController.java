package unimib.ingsof.logic;

import java.util.Map;
import java.util.TreeMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import unimib.ingsof.exceptions.DoesntExistsException;
import unimib.ingsof.exceptions.NotEnoughIngredientsException;
import unimib.ingsof.exceptions.ValidationException;
import unimib.ingsof.exceptions.WrongIDGenerationInitialization;
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
		
	public void execute(String recipeID) throws NotEnoughIngredientsException, DoesntExistsException, ValidationException, WrongIDGenerationInitialization   {
		this.execute(recipeID, 1);
	}
	
	public void execute(String recipeID, float multiplier) throws NotEnoughIngredientsException, DoesntExistsException, ValidationException, WrongIDGenerationInitialization   {
		if (!shoppingController.getShoppingList(recipeID).isEmpty()) 
			throw new NotEnoughIngredientsException();
		RecipeView recipe = recipeController.getRecipeByID(recipeID);
		for (RecipeIngredientView recipeIngredient : recipe.getIngredients()) {
			String ingredientID = recipeIngredient.getIngredientID();
			float inventoryIngredientQuantity = inventoryIngredientController.getIngredient(ingredientID).getQuantity();
			float recipeIngredientQuantity =  multiplier * recipeIngredient.getQuantity();
			Map<String, String> ingredientObject = new TreeMap<>();
			ingredientObject.put("quantity",  Float.toString(inventoryIngredientQuantity-recipeIngredientQuantity));				
			inventoryIngredientController.updateIngredient(ingredientID, ingredientObject);
		}		
	}
}