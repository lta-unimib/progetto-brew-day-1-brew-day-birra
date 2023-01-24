package unimib.ingsof.controller;

import static org.junit.Assert.assertTrue;

import java.util.Map;
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
		
		assertTrue(recipeController.deleteRecipe(recipeID).getStatusCode().is2xxSuccessful());
		assertTrue(recipeController.getRecipeByID(recipeID).getStatusCode().is4xxClientError());
		
		recipesRepository.rebase();
		ingredientsRepository.rebase();
	}
}