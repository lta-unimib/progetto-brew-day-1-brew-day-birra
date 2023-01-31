package unimib.ingsof.logic;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import unimib.ingsof.exceptions.DoesntExistsException;
import unimib.ingsof.exceptions.WrongBodyException;
import unimib.ingsof.persistence.model.Ingredient;
import unimib.ingsof.persistence.model.RecipeIngredient;
import unimib.ingsof.persistence.repository.RecipeIngredientRepository;
import unimib.ingsof.persistence.view.RecipeIngredientView;

@Service
public class RecipeIngredientController {
	@Autowired
	private RecipeIngredientRepository recipeIngredientRepository;
	@Autowired
	private IngredientController ingredientController;
	
	public RecipeIngredientView getIngredient(String recipeID, String ingredientID) throws DoesntExistsException {
		RecipeIngredient recipeIngredient = recipeIngredientRepository.getIngredient(recipeID, ingredientID);
		Ingredient ingredient = ingredientController.getIngredient(ingredientID);
		if (ingredient == null)
			throw new DoesntExistsException();
		if (recipeIngredient == null)
			throw new DoesntExistsException();
		
		return new RecipeIngredientView(recipeIngredient.getRecipeID(),
										recipeIngredient.getIngredientID(),
										ingredient.getName(),
										recipeIngredient.getQuantity());
	}
	
	public RecipeIngredientView updateIngredient(String recipeID, String ingredientID, Map<String, String> ingredientObject) throws WrongBodyException, DoesntExistsException, NumberFormatException {
		if (ingredientObject == null)
			throw new WrongBodyException();
		String quantity = ingredientObject.get("quantity");
		
		if (quantity == null)
			throw new WrongBodyException();
		
		RecipeIngredient recipeIngredient = recipeIngredientRepository.getIngredient(recipeID, ingredientID);
		if (recipeIngredient == null)
			throw new DoesntExistsException();
			
		recipeIngredientRepository.updateIngredient(recipeID, ingredientID, Float.valueOf(quantity));
		return this.getIngredient(recipeID, ingredientID);
	}
	
	public void deleteIngredient(String recipeID, String ingredientID) {
		this.recipeIngredientRepository.deleteIngredient(recipeID, ingredientID);
	}
}