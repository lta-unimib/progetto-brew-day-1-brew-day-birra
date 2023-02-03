package unimib.ingsof.logic;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import unimib.ingsof.exceptions.DoesntExistsException;
import unimib.ingsof.persistence.view.IngredientView;
import unimib.ingsof.persistence.view.RecipeIngredientView;
import unimib.ingsof.persistence.view.RecipeView;

@Service
public class ShoppingController {
	@Autowired
	InventoryController invCon;

	@Autowired
	RecipeController recipeController;
	@Autowired
	InventoryIngredientController inventoryIngredientController;
	
	public ArrayList<IngredientView> getShoppingList(String recipeID) throws DoesntExistsException{
		ArrayList<IngredientView> result = new ArrayList<>();
		RecipeView recipe = recipeController.getRecipeByID(recipeID);
		List<RecipeIngredientView> recipeIngredients = recipe.getIngredients();			
		Float multiplier = (float) 1;
		for (RecipeIngredientView recipeIngredient : recipeIngredients) {
			System.out.println("quiiii " + invCon.getAll());
			String ingredientID = recipeIngredient.getIngredientID();
			Float inventoryIngredientQuantity = inventoryIngredientController.getIngredient(ingredientID).getQuantity();
			Float recipeIngredientQuantity =  multiplier * recipeIngredient.getQuantity();
			if (recipeIngredientQuantity > inventoryIngredientQuantity)
				result.add(new IngredientView(ingredientID, recipeIngredient.getName(), recipeIngredientQuantity - inventoryIngredientQuantity));
		}
		return result;
	}
	
}
