package unimib.ingsof.logic;

import java.util.ArrayList;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import unimib.ingsof.persistence.model.Ingredient;
import unimib.ingsof.persistence.model.IngredientInstance;
import unimib.ingsof.persistence.model.Recipe;
import unimib.ingsof.persistence.repository.RecipeIngredientRepository;
import unimib.ingsof.persistence.repository.RecipeRepository;
import unimib.ingsof.persistence.view.RecipeView;

@Service
public class RecipeController {
	@Autowired
	private RecipeRepository recipeRepository;
	@Autowired
	private RecipeIngredientRepository recipeIngredientRepository;
	@Autowired
	IngredientController ingredientController;

	public RecipeView getRecipeByID(String recipeID) throws Exception {
		Recipe recipe = this.recipeRepository.getRecipe(recipeID);
		if (recipe == null)
			throw new Exception();
		
		ArrayList<IngredientInstance> ingredients = recipeIngredientRepository.getAll(recipeID);
		return new RecipeView(recipeID, recipe.getName(), ingredients);
	}
	
	public RecipeView updateRecipe(String recipeID, Map<String, String> recipeObject) throws Exception {
		Recipe recipe = this.recipeRepository.getRecipe(recipeID);
		if (recipe == null)
			throw new Exception();
		if (recipeObject == null)
			throw new Exception();
		
		String newName = recipeObject.get("name");
		if (newName == null)
			throw new Exception();
		
		this.recipeRepository.updateRecipe(recipeID, newName);
		return this.getRecipeByID(recipeID);
	}
	
	public void deleteRecipe(String recipeID) {
		this.recipeRepository.deleteRecipe(recipeID);
	}
	
	public String addIngredient(String recipeID, Map<String, String> ingredientObject) throws Exception {
		if (ingredientObject == null)
			throw new Exception();
		
		String name = ingredientObject.get("name");
		String quantity = ingredientObject.get("quantity");
		String ingredientID;
		
		if (name == null || quantity == null)
			throw new Exception();
		
		Ingredient ingrediente = this.ingredientController.getIngredientByName(name);
		if(ingrediente == null) {
    		ingrediente = this.ingredientController.addIngredient(name);
    		ingredientID = ingrediente.getIngredientID();
    	} else {
    		ingredientID = ingrediente.getIngredientID();
    	}
		
		this.recipeIngredientRepository.addRecipeIngredient(recipeID, ingredientID, Float.valueOf(quantity));
		return ingredientID;
	}
}
