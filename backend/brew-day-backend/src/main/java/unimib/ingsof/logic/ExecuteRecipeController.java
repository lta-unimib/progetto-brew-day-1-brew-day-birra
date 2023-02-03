package unimib.ingsof.logic;

import java.util.ArrayList;
import java.util.Map;
import java.util.TreeMap;

import unimib.ingsof.exceptions.DoesntExistsException;
import unimib.ingsof.exceptions.NotEnoughIngredientsException;
import unimib.ingsof.exceptions.ValidationException;
import unimib.ingsof.persistence.view.IngredientView;
import unimib.ingsof.persistence.view.RecipeIngredientView;
import unimib.ingsof.persistence.view.RecipeView;

public class ExecuteRecipeController {
	
	RecipeController recipeController;
	InventoryIngredientController inventoryIngredientController;
	
	public ArrayList<IngredientView> getShoppingList(String recipeID) throws DoesntExistsException{
		ArrayList<IngredientView> result = new ArrayList<>();
		RecipeView recipe = recipeController.getRecipeByID(recipeID);
		ArrayList<RecipeIngredientView> recipeIngredients = (ArrayList<RecipeIngredientView>) recipe.getIngredients();			
		Float multiplier = (float) 1;
		for (RecipeIngredientView recipeIngredient : recipeIngredients) {
			String ingredientID = recipeIngredient.getIngredientID();
			Float inventoryIngredientQuantity = inventoryIngredientController.getIngredient(ingredientID).getQuantity();
			Float recipeIngredientQuantity =  multiplier * recipeIngredient.getQuantity();
			if (recipeIngredientQuantity > inventoryIngredientQuantity)
				result.add(new IngredientView(ingredientID, recipeIngredient.getName(), recipeIngredientQuantity - inventoryIngredientQuantity));
		}
		return result;
	}
	
	public void execute(String recipeID) throws NotEnoughIngredientsException, DoesntExistsException, ValidationException   {
		if (!getShoppingList(recipeID).isEmpty()) 
			throw new NotEnoughIngredientsException();
		RecipeView recipe = recipeController.getRecipeByID(recipeID);
		Float multiplier = (float) 1;				
		ArrayList<RecipeIngredientView> recipeIngredients = (ArrayList<RecipeIngredientView>) recipe.getIngredients();
		for (RecipeIngredientView recipeIngredient : recipeIngredients) {
			String ingredientID = recipeIngredient.getIngredientID();
			Float inventoryIngredientQuantity = inventoryIngredientController.getIngredient(ingredientID).getQuantity();
			Float recipeIngredientQuantity =  multiplier * recipeIngredient.getQuantity();
			Map<String, String> ingredientObject = new TreeMap<String, String>();
			ingredientObject.put("quantity",  Float.toString(inventoryIngredientQuantity-recipeIngredientQuantity));				
			inventoryIngredientController.updateIngredient(ingredientID, ingredientObject);
		}		
	}
}
