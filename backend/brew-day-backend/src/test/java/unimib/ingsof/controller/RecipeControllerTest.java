package unimib.ingsof.controller;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import java.util.Map;
import java.util.TreeMap;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import unimib.ingsof.model.RecipeRepository;
import unimib.ingsof.model.IngredientRepository;
import unimib.ingsof.model.RecipeIngredientRepository;

@SpringBootTest
class RecipeControllerTest {
	@Autowired
	private RecipeListController recipeListController;
	@Autowired
	private RecipeController recipeController;
	@Autowired
	private RecipeRepository recipesRepository;
	@Autowired
	private RecipeIngredientRepository recipeIngredientsRepository;
	@Autowired
	private IngredientRepository ingredientsRepository;
	

	@Test
	void testBehavior() {
		ingredientsRepository.assure();
		recipesRepository.assure();
		recipeIngredientsRepository.assure();
		
		String recipeName = "RecipeControllerTest";
		String recipeID = recipeName;
		String ingredientName = recipeName;
		
		Map<String, String> recipeBody = new TreeMap<String, String>();
		recipeBody.put("name", recipeName);
		recipeListController.postRecipe(recipeBody).getStatusCode();
		
		assertTrue(recipeController.getRecipeByID(recipeID).getStatusCode().is2xxSuccessful());
		
		recipeBody.clear();
		recipeBody.put("name", recipeName);
		assertTrue(recipeController.updateRecipe(recipeName, recipeBody).getStatusCode().is2xxSuccessful());

		recipeBody.clear();
		recipeBody.put("name", ingredientName);
		recipeBody.put("quantity", "7");
		assertTrue(recipeController.postRecipeIngredient(recipeID, recipeBody).getStatusCode().is2xxSuccessful());
		assertFalse(recipeController.postRecipeIngredient(recipeID, recipeBody).getStatusCode().is2xxSuccessful());

		assertTrue(recipeController.deleteRecipe(recipeID).getStatusCode().is2xxSuccessful());
		assertTrue(recipeController.getRecipeByID(recipeID).getStatusCode().is4xxClientError());

		recipeIngredientsRepository.drop();
		recipesRepository.drop();
		ingredientsRepository.drop();

	}
	
	@Test
	void allGoesWrong() {
		ingredientsRepository.assure();
		recipesRepository.assure();
		recipeIngredientsRepository.assure();

		String recipeID = "name";
		Map<String, String> recipeBody = null;
		
		assertTrue(recipeController.updateRecipe(recipeID, recipeBody).getStatusCode().is4xxClientError());
		
		recipeBody = new TreeMap<>();
		assertTrue(recipeController.updateRecipe(recipeID, recipeBody).getStatusCode().is4xxClientError());

		recipeBody.put("name", recipeID);
		assertTrue(recipeController.updateRecipe(recipeID, recipeBody).getStatusCode().is4xxClientError());

		assertTrue(recipeListController.postRecipe(recipeBody).getStatusCode().is2xxSuccessful());

		Map<String, String> ingredientBody = null;
		
		assertTrue(recipeController.postRecipeIngredient(recipeID, ingredientBody).getStatusCode().is4xxClientError());
		
		ingredientBody = new TreeMap<>();
		assertTrue(recipeController.postRecipeIngredient(recipeID, ingredientBody).getStatusCode().is4xxClientError());

		ingredientBody.put("name", "name");
		assertTrue(recipeController.postRecipeIngredient(recipeID, ingredientBody).getStatusCode().is4xxClientError());
		
		ingredientBody.clear();
		ingredientBody.put("quantity", "quantity");
		assertTrue(recipeController.postRecipeIngredient(recipeID, ingredientBody).getStatusCode().is4xxClientError());
		
		ingredientBody.put("name", "name");
		assertTrue(recipeController.postRecipeIngredient(recipeID, ingredientBody).getStatusCode().is4xxClientError());

		recipeIngredientsRepository.drop();
		recipesRepository.drop();
		ingredientsRepository.drop();
	}
}