package unimib.ingsof.controller;

import static org.junit.Assert.assertTrue;
import static org.junit.Assert.assertEquals;

import java.util.Map;
import java.util.TreeMap;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import unimib.ingsof.model.RecipeIngredientRepository;
import unimib.ingsof.model.RecipeRepository;

@SpringBootTest
public class RecipeIngredientControllerTest {
	@Autowired
	private RecipeListController recipeListController;
	@Autowired
	private RecipeController recipeController;
	@Autowired
	private RecipeIngredientController ingredientController;
	@Autowired
	private RecipeRepository recipesRepository;
	@Autowired
	private RecipeIngredientRepository ingredientsRepository;

	@Test
	void contextLoads() {
	}
	
	@Test
	public void testBehavior() {
		recipesRepository.assure();
		ingredientsRepository.assure();
		
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
	}
}