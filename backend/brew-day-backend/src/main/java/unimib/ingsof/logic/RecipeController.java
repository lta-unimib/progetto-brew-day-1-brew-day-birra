package unimib.ingsof.logic;

import java.util.ArrayList;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import unimib.ingsof.exceptions.DoesntExistsException;
import unimib.ingsof.exceptions.WrongBodyException;
import unimib.ingsof.persistence.model.Recipe;
import unimib.ingsof.persistence.model.RecipeIngredient;
import unimib.ingsof.persistence.repository.RecipeIngredientRepository;
import unimib.ingsof.persistence.repository.RecipeRepository;
import unimib.ingsof.persistence.view.RecipeIngredientView;
import unimib.ingsof.persistence.view.RecipeView;

@Service
public class RecipeController {
	@Autowired
	private RecipeRepository recipeRepository;
	@Autowired
	private RecipeIngredientRepository recipeIngredientRepository;
	@Autowired
	IngredientController ingredientController;

	public RecipeView getRecipeByID(String recipeID) throws DoesntExistsException {
		Recipe recipe = this.recipeRepository.getRecipe(recipeID);
		if (recipe == null)
			throw new DoesntExistsException();
		
		ArrayList<RecipeIngredient> ingredients =  recipeIngredientRepository.getAll(recipeID);
		ArrayList<RecipeIngredientView> result =  new ArrayList<>();
		for (RecipeIngredient ingredient : ingredients) {
			String name = ingredientController.getIngredient(ingredient.getIngredientID()).getName();
			result.add(new RecipeIngredientView(ingredient.getRecipeID(), ingredient.getIngredientID(), name, ingredient.getQuantity()));
		}
		return new RecipeView(recipeID, recipe.getName(), recipe.getDescription(), result);
	}
	
	public RecipeView updateRecipe(String recipeID, Map<String, String> recipeObject) throws DoesntExistsException, WrongBodyException {
		Recipe recipe = this.recipeRepository.getRecipe(recipeID);
		if (recipe == null)
			throw new DoesntExistsException();
		if (recipeObject == null)
			throw new WrongBodyException();
		
		String newName = recipeObject.get("name");
		if (newName == null)
			throw new WrongBodyException();
		
		this.recipeRepository.updateRecipe(recipeID, newName);
		return this.getRecipeByID(recipeID);
	}
	
	public void deleteRecipe(String recipeID) {
		this.recipeRepository.deleteRecipe(recipeID);
	}
	
	public String addIngredient(String recipeID, Map<String, String> ingredientObject) throws WrongBodyException, NumberFormatException {
		if (ingredientObject == null)
			throw new WrongBodyException();
		
		String name = ingredientObject.get("name");
		String quantity = ingredientObject.get("quantity");
		
		if (name == null || quantity == null)
			throw new WrongBodyException();
		
		String ingredientID = this.ingredientController.addIngredient(name).getIngredientID();
		this.recipeIngredientRepository.addIngredient(recipeID, ingredientID, Float.valueOf(quantity));
		return ingredientID;
	}
}
