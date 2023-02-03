package unimib.ingsof.logic;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import unimib.ingsof.exceptions.DoesntExistsException;
import unimib.ingsof.exceptions.ValidationException;
import unimib.ingsof.exceptions.WrongIDGenerationInitialization;
import unimib.ingsof.persistence.service.Protocol;
import unimib.ingsof.persistence.view.IngredientView;
import unimib.ingsof.persistence.view.RecipeIngredientView;
import unimib.ingsof.persistence.view.RecipeView;
import unimib.ingsof.validation.validators.IngredientInitializationValidator;

@Service
public class ShoppingController {
	@Autowired
	RecipeController recipeController;
	@Autowired
	InventoryIngredientController inventoryIngredientController;
	@Autowired
	InventoryController inventoryController;
	@Autowired
	IngredientController ingredientController;
	
	public List<IngredientView> getShoppingList(String recipeID) throws DoesntExistsException{
		ArrayList<IngredientView> result = new ArrayList<>();
		RecipeView recipe = recipeController.getRecipeByID(recipeID);
		List<RecipeIngredientView> recipeIngredients = recipe.getIngredients();			
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
	
	public void postShoppingList(List<Map<String, String>> ingredients) throws ValidationException, WrongIDGenerationInitialization, DoesntExistsException {
		List<IngredientView> updateList = new ArrayList<>();
		for (Map<String, String> ingredientObject : ingredients) {
			ingredientObject = IngredientInitializationValidator.getInstance().handle(ingredientObject);
			String ingredientName = ingredientObject.get(Protocol.NAME_KEY);
			String ingredientID = ingredientController.addIngredient(ingredientName).getIngredientID();
			
			IngredientView inventoryIngredient;
			try {
				inventoryIngredient = inventoryIngredientController.getIngredient(ingredientID);
			} catch(DoesntExistsException exception) {
				Map<String, String> newIngredientObject = new TreeMap<>();
				newIngredientObject.put(Protocol.NAME_KEY, ingredientName);
				newIngredientObject.put(Protocol.QUANTITY_KEY, "0");
				inventoryIngredient = new IngredientView(inventoryController.addIngredient(newIngredientObject), ingredientName, 0);
			}
			
			inventoryIngredient.setQuantity(inventoryIngredient.getQuantity() + Float.parseFloat(ingredientObject.get(Protocol.QUANTITY_KEY)));
			updateList.add(inventoryIngredient);
		}
		
		for (IngredientView ingredient : updateList) {
			Map<String, String> newIngredientObject = new TreeMap<>();
			newIngredientObject.put(Protocol.QUANTITY_KEY, Float.toString(ingredient.getQuantity()));
			inventoryIngredientController.updateIngredient(ingredient.getIngredientID(), newIngredientObject);
		}
	}
}
