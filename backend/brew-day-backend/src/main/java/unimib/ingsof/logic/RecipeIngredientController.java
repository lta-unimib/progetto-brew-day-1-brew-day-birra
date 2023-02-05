package unimib.ingsof.logic;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import unimib.ingsof.exceptions.DoesntExistsException;
import unimib.ingsof.exceptions.ValidationException;
import unimib.ingsof.persistence.model.Ingredient;
import unimib.ingsof.persistence.model.RecipeIngredient;
import unimib.ingsof.persistence.repository.RecipeIngredientRepository;
import unimib.ingsof.persistence.service.Protocol;
import unimib.ingsof.persistence.view.RecipeIngredientView;
import unimib.ingsof.validation.validators.IngredientUpdatingValidator;

@Service
public class RecipeIngredientController {
	@Autowired
	private RecipeIngredientRepository recipeIngredientRepository;
	@Autowired
	private IngredientController ingredientController;
	
	public RecipeIngredientView getIngredient(String recipeID, String ingredientID) throws DoesntExistsException {
		RecipeIngredient recipeIngredient = recipeIngredientRepository.getIngredient(recipeID, ingredientID);
		Ingredient ingredient = ingredientController.getIngredient(ingredientID);
		if (ingredient == null || recipeIngredient == null)
			throw new DoesntExistsException();
		
		return new RecipeIngredientView(recipeIngredient.getRecipeID(),
										recipeIngredient.getIngredientID(),
										ingredient.getName(),
										recipeIngredient.getQuantity());
	}
	
	public RecipeIngredientView updateIngredient(String recipeID, String ingredientID, Map<String, String> ingredientObject) throws ValidationException, DoesntExistsException {
		ingredientObject = IngredientUpdatingValidator.getInstance().handle(ingredientObject);
		float quantity = Float.parseFloat(ingredientObject.get(Protocol.QUANTITY_KEY));
		
		RecipeIngredientView ingredient = this.getIngredient(recipeID, ingredientID);
		recipeIngredientRepository.updateIngredient(recipeID, ingredientID, quantity);
		ingredient.setQuantity(quantity);
		return ingredient;
	}
	
	public void deleteIngredient(String recipeID, String ingredientID) {
		this.recipeIngredientRepository.deleteIngredient(recipeID, ingredientID);
	}
}