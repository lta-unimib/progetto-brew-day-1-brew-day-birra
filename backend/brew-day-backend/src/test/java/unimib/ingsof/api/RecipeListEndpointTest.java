package unimib.ingsof.api;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Map;
import java.util.Optional;
import java.util.TreeMap;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import unimib.ingsof.persistence.repository.RecipeRepository;

@SpringBootTest
class RecipeListEndpointTest {
	@Autowired
	private RecipeListEndpoint recipeListController;
	@Autowired
	private RecipeRepository recipesRepository;
	
	@Test
	void testBehavior() {
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
	
	@Test
	void testAlternative() {
		recipesRepository.assure();
		assertTrue(recipeListController.getRecipeIDs(Optional.of("name")).getStatusCode().is2xxSuccessful());
		recipesRepository.drop();
	}
	
	@Test
	void allGoesWrong() {
		recipesRepository.assure();
		Map<String, String> recipeBody = null;
		assertTrue(recipeListController.postRecipe(recipeBody).getStatusCode().is4xxClientError());
		
		recipeBody = new TreeMap<>();
		assertTrue(recipeListController.postRecipe(recipeBody).getStatusCode().is4xxClientError());
		recipesRepository.drop();
	}
}