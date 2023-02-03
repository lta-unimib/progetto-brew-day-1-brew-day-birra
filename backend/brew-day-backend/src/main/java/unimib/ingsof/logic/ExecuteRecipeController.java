package unimib.ingsof.logic;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import unimib.ingsof.exceptions.DoesntExistsException;
import unimib.ingsof.exceptions.NotEnoughIngredientsException;
import unimib.ingsof.exceptions.ValidationException;
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
		
	public void execute(String recipeID) throws NotEnoughIngredientsException, DoesntExistsException, ValidationException   {
		if (!shoppingController.getShoppingList(recipeID).isEmpty()) 
			throw new NotEnoughIngredientsException();
		RecipeView recipe = recipeController.getRecipeByID(recipeID);
		Float multiplier = (float) 1;				
		List<RecipeIngredientView> recipeIngredients = recipe.getIngredients();
		for (RecipeIngredientView recipeIngredient : recipeIngredients) {
			String ingredientID = recipeIngredient.getIngredientID();
			Float inventoryIngredientQuantity = inventoryIngredientController.getIngredient(ingredientID).getQuantity();
			Float recipeIngredientQuantity =  multiplier * recipeIngredient.getQuantity();
			Map<String, String> ingredientObject = new TreeMap<>();
			ingredientObject.put("quantity",  Float.toString(inventoryIngredientQuantity-recipeIngredientQuantity));				
			inventoryIngredientController.updateIngredient(ingredientID, ingredientObject);
		}		
	}
}
