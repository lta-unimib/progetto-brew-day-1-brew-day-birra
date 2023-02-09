package unimib.ingsof.logic;

import java.util.ArrayList;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import unimib.ingsof.exceptions.DoesntExistsException;
import unimib.ingsof.exceptions.ValidationException;
import unimib.ingsof.exceptions.WrongIDGenerationInitialization;
import unimib.ingsof.persistence.model.Recipe;
import unimib.ingsof.persistence.model.RecipeIngredient;
import unimib.ingsof.persistence.repository.RecipeIngredientRepository;
import unimib.ingsof.persistence.repository.RecipeRepository;
import unimib.ingsof.persistence.service.Protocol;
import unimib.ingsof.persistence.view.RecipeIngredientView;
import unimib.ingsof.persistence.view.RecipeView;
import unimib.ingsof.validation.validators.IngredientInitializationValidator;
import unimib.ingsof.validation.validators.RecipeUpdatingValidator;

@Service
public class RecipeController {
	@Autowired
	private RecipeRepository recipeRepository;
	@Autowired
	private RecipeIngredientRepository recipeIngredientRepository;
	@Autowired
	IngredientController ingredientController;

	public RecipeView getRecipeByID(String recipeID) throws DoesntExistsException {
		Recipe recipe = this.getRecipeDetailsByID(recipeID);
		
		ArrayList<RecipeIngredientView> result =  new ArrayList<>();
		ArrayList<RecipeIngredient> ingredients =  recipeIngredientRepository.getAll(recipeID);
		for (RecipeIngredient ingredient : ingredients) {
			String name = ingredientController.getIngredient(ingredient.getIngredientID()).getName();
			result.add(new RecipeIngredientView(ingredient.getRecipeID(), ingredient.getIngredientID(), name, ingredient.getQuantity()));
		}
		return new RecipeView(recipeID, recipe.getName(), recipe.getDescription(), result);
	}

	public Recipe getRecipeDetailsByID(String recipeID) throws DoesntExistsException {
		Recipe recipe = this.recipeRepository.getRecipe(recipeID);
		if (recipe == null)
			throw new DoesntExistsException();
		return new Recipe(recipeID, recipe.getName(), recipe.getDescription());
	}
	
	public RecipeView updateRecipe(String recipeID, Map<String, String> recipeObject) throws ValidationException, DoesntExistsException {
		recipeObject = RecipeUpdatingValidator.getInstance().handle(recipeObject);
		this.getRecipeDetailsByID(recipeID);

		String newName = recipeObject.get(Protocol.NAME_BODY_KEY);
		String newDescription = recipeObject.get(Protocol.DESCRIPTION_BODY_KEY);
		
		if (newName != null)
			this.recipeRepository.updateRecipeName(recipeID, newName);
		
		if (newDescription != null)
			this.recipeRepository.updateRecipeDescription(recipeID, newDescription);
		return this.getRecipeByID(recipeID);
	}
	
	public void deleteRecipe(String recipeID) {
		this.recipeRepository.deleteRecipe(recipeID);
	}
	
	public String addIngredient(String recipeID, Map<String, String> ingredientObject) throws ValidationException, WrongIDGenerationInitialization, DoesntExistsException {
		ingredientObject = IngredientInitializationValidator.getInstance().handle(ingredientObject);
		String name = ingredientObject.get(Protocol.NAME_BODY_KEY);
		float quantity = Float.parseFloat(ingredientObject.get(Protocol.QUANTITY_BODY_KEY));
		
		String ingredientID = this.ingredientController.addIngredient(name).getIngredientID();
		this.getRecipeDetailsByID(recipeID);
		this.recipeIngredientRepository.addIngredient(recipeID, ingredientID, quantity);
		return ingredientID;
	}
}
