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
	private RecipeListController controller;
	@Autowired
	private RecipeRepository repository;

	@Test
	void contextLoads() {
	}
	
	@Test
	public void testBehavior() {
		repository.assure();
		
		int oldnum = controller.getRecipeIDs(Optional.empty()).getBody().size();
		
		Map<String, String> recipeBody = new TreeMap<String, String>();
		recipeBody.put("name", "RecipeListControllerTest");
		assertTrue(controller.postRecipe(recipeBody).getStatusCode().is2xxSuccessful());
		assertEquals(oldnum + 1, controller.getRecipeIDs(Optional.empty()).getBody().size());
		
		assertFalse(controller.postRecipe(recipeBody).getStatusCode().is2xxSuccessful());
		assertEquals(oldnum + 1, controller.getRecipeIDs(Optional.empty()).getBody().size());
	}
}