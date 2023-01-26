package unimib.ingsof.controller;

import static org.junit.Assert.assertTrue;
import static org.junit.Assert.assertEquals;

import java.util.Map;
import java.util.TreeMap;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import unimib.ingsof.model.IngredientRepository;
import unimib.ingsof.model.RecipeIngredientRepository;
import unimib.ingsof.model.RecipeRepository;

@SpringBootTest
class RecipeIngredientControllerTest {
	@Autowired
	private RecipeListController recipeListController;
	@Autowired
	private RecipeController recipeController;
	@Autowired
	private RecipeIngredientController ingredientController;
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
		
		String recipeID = "RecipeIngredientControllerTest";
		String ingredientID = recipeID;
		Map<String, String> recipeBody = new TreeMap<String, String>();
		recipeBody.put("name", recipeID);
		recipeListController.postRecipe(recipeBody);
		
		Map<String, String> ingredientBody = new TreeMap<String, String>();
		ingredientBody.put("name", ingredientID);
		ingredientBody.put("quantity", "7");
		recipeController.postRecipeIngredient(recipeID, ingredientBody);
		
		assertTrue(ingredientController.getRecipeIngredientByID(recipeID, ingredientID).getStatusCode().is2xxSuccessful());
		
		ingredientBody.clear();
		ingredientBody.put("quantity", "17");
		assertTrue(ingredientController.updateRecipeIngredient(recipeID, ingredientID, ingredientBody).getStatusCode().is2xxSuccessful());
		assertEquals(17, ingredientController.getRecipeIngredientByID(recipeID, ingredientID).getBody().getQuantity(), 0.1);
		
		assertTrue(ingredientController.deleteRecipeIngredient(recipeID, ingredientID).getStatusCode().is2xxSuccessful());
		assertTrue(ingredientController.getRecipeIngredientByID(recipeID, ingredientID).getStatusCode().is4xxClientError());

		recipeIngredientsRepository.drop();
		recipesRepository.drop();
		ingredientsRepository.drop();
	}
	
	@Test
	void allGoesWrong() {
		ingredientsRepository.assure();
		recipesRepository.assure();
		recipeIngredientsRepository.assure();
		
		String recipeID = "RecipeIngredientControllerTest";
		String ingredientID = recipeID;
		
		Map<String, String> recipeBody = new TreeMap<>();
		recipeBody.put("name", recipeID);
		recipeListController.postRecipe(recipeBody);
		
		Map<String, String> ingredientBody = null;
		assertTrue(ingredientController.updateRecipeIngredient(recipeID, ingredientID, ingredientBody).getStatusCode().is4xxClientError());
		
		ingredientBody = new TreeMap<>();
		assertTrue(ingredientController.updateRecipeIngredient(recipeID, ingredientID, ingredientBody).getStatusCode().is4xxClientError());
		
		ingredientBody.put("quantity", ingredientID);
		assertTrue(ingredientController.updateRecipeIngredient(recipeID, ingredientID, ingredientBody).getStatusCode().is4xxClientError());
		
		ingredientBody.put("quantity", "17");
		assertTrue(ingredientController.updateRecipeIngredient(recipeID, ingredientID, ingredientBody).getStatusCode().is4xxClientError());
		
		recipeIngredientsRepository.drop();
		recipesRepository.drop();
		ingredientsRepository.drop();
	}
}