package unimib.ingsof.controller;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Map;
import java.util.Optional;
import java.util.TreeMap;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import unimib.ingsof.model.RecipeRepository;

@SpringBootTest
public class RecipeListControllerTest {
	@Autowired
	private RecipeListController recipeListController;
	@Autowired
	private RecipeRepository recipesRepository;

	@Test
	void contextLoads() {
	}
	
	@Test
	public void testBehavior() {
		recipesRepository.assure();
		
		int oldnum = recipeListController.getRecipeIDs(Optional.empty()).getBody().size();
		
		Map<String, String> recipeBody = new TreeMap<String, String>();
		recipeBody.put("name", "RecipeListControllerTest");
		assertTrue(recipeListController.postRecipe(recipeBody).getStatusCode().is2xxSuccessful());
		assertEquals(oldnum + 1, recipeListController.getRecipeIDs(Optional.empty()).getBody().size());
		
		assertFalse(recipeListController.postRecipe(recipeBody).getStatusCode().is2xxSuccessful());
		assertEquals(oldnum + 1, recipeListController.getRecipeIDs(Optional.empty()).getBody().size());

		recipesRepository.drop();
	}
}