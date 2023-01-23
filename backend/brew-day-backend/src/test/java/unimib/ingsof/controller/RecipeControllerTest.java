package unimib.ingsof.controller;

import static org.junit.Assert.assertTrue;
import static org.junit.Assert.assertFalse;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Map;
import java.util.Optional;
import java.util.TreeMap;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import unimib.ingsof.model.RecipeRepository;
import unimib.ingsof.model.RecipeIngredientRepository;

@SpringBootTest
public class RecipeControllerTest {
	@Autowired
	private RecipeListController recipeListController;
	@Autowired
	private RecipeController recipeController;
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
		
		Map<String, String> recipeBody = new TreeMap<String, String>();
		recipeBody.put("name", "RecipeControllerTest");

		assertEquals(0, recipeListController.getRecipeIDs(Optional.empty()).getBody().size());
		assertTrue(recipeListController.postRecipe(recipeBody).getStatusCode().is2xxSuccessful());
		assertEquals(1, recipeListController.getRecipeIDs(Optional.empty()).getBody().size());
		
		assertTrue(recipeController.getRecipeByID("RecipeControllerTest").getStatusCode().is2xxSuccessful());
		
		recipeBody.clear();
		recipeBody.put("name", "RecipeControllerTest");
		assertTrue(recipeController.updateRecipe("name", recipeBody).getStatusCode().is2xxSuccessful());

		recipeBody.clear();
		recipeBody.put("name", "RecipeControllerTest");
		recipeBody.put("quantity", "7");
		assertTrue(recipeController.postRecipeIngredient("name", recipeBody).getStatusCode().is2xxSuccessful());
		
		assertTrue(recipeController.deleteRecipe("name").getStatusCode().is2xxSuccessful());
		
	}
}