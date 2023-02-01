package unimib.ingsof.api;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import java.util.Map;
import java.util.TreeMap;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import unimib.ingsof.persistence.repository.IngredientRepository;
import unimib.ingsof.persistence.repository.RecipeIngredientRepository;
import unimib.ingsof.persistence.repository.RecipeRepository;

@SpringBootTest
class RecipeEndpointTest {
	@Autowired
	private RecipeListEndpoint recipeListEndpoint;
	@Autowired
	private RecipeEndpoint recipeEndpoint;
	@Autowired
	private RecipeRepository recipeRepository;
	@Autowired
	private RecipeIngredientRepository recipeIngredientRepository;
	@Autowired
	private IngredientRepository ingredientRepository;
	

	@Test
	void testBehavior() {
		ingredientRepository.assure();
		recipeRepository.assure();
		recipeIngredientRepository.assure();
		
		String recipeName = "RecipeControllerTest";
		String ingredientName = recipeName;
		
		Map<String, String> recipeBody = new TreeMap<String, String>();
		recipeBody.put("name", recipeName);
		String recipeID = recipeListEndpoint.postRecipe(recipeBody).getHeaders().getFirst("recipeID");
		
		assertTrue(recipeEndpoint.getRecipeByID(recipeID).getStatusCode().is2xxSuccessful());
		
		recipeBody.clear();
		recipeBody.put("name", recipeName);
		assertTrue(recipeEndpoint.updateRecipe(recipeID, recipeBody).getStatusCode().is2xxSuccessful());

		recipeBody.clear();
		recipeBody.put("name", ingredientName);
		recipeBody.put("quantity", "7");
		assertTrue(recipeEndpoint.postRecipeIngredient(recipeID, recipeBody).getStatusCode().is2xxSuccessful());
		assertFalse(recipeEndpoint.postRecipeIngredient(recipeID, recipeBody).getStatusCode().is2xxSuccessful());
		
		assertTrue(recipeEndpoint.getRecipeByID(recipeID).getStatusCode().is2xxSuccessful());

		assertTrue(recipeEndpoint.deleteRecipe(recipeID).getStatusCode().is2xxSuccessful());
		assertTrue(recipeEndpoint.getRecipeByID(recipeID).getStatusCode().is4xxClientError());

		recipeIngredientRepository.drop();
		recipeRepository.drop();
		ingredientRepository.drop();

	}
	
	@Test
	void allGoesWrong() {
		ingredientRepository.assure();
		recipeRepository.assure();
		recipeIngredientRepository.assure();

		String recipeName = "name";
		Map<String, String> recipeBody = new TreeMap<String, String>();
		recipeBody.put("name", recipeName);
		String recipeID = recipeListEndpoint.postRecipe(recipeBody).getHeaders().getFirst("recipeID");
				
		recipeBody = null;
		assertTrue(recipeEndpoint.updateRecipe(recipeID, recipeBody).getStatusCode().is4xxClientError());
		
		recipeBody = new TreeMap<>();
		assertTrue(recipeEndpoint.updateRecipe(recipeID, recipeBody).getStatusCode().is4xxClientError());

		assertTrue(recipeEndpoint.deleteRecipe(recipeID).getStatusCode().is2xxSuccessful());
		
		recipeBody.put("name", recipeName);
		assertTrue(recipeEndpoint.updateRecipe(recipeID, recipeBody).getStatusCode().is4xxClientError());

		assertTrue(recipeListEndpoint.postRecipe(recipeBody).getStatusCode().is2xxSuccessful());

		Map<String, String> ingredientBody = null;
		
		assertTrue(recipeEndpoint.postRecipeIngredient(recipeID, ingredientBody).getStatusCode().is4xxClientError());
		
		ingredientBody = new TreeMap<>();
		assertTrue(recipeEndpoint.postRecipeIngredient(recipeID, ingredientBody).getStatusCode().is4xxClientError());

		ingredientBody.put("name", "name");
		assertTrue(recipeEndpoint.postRecipeIngredient(recipeID, ingredientBody).getStatusCode().is4xxClientError());
		
		ingredientBody.clear();
		ingredientBody.put("quantity", "quantity");
		assertTrue(recipeEndpoint.postRecipeIngredient(recipeID, ingredientBody).getStatusCode().is4xxClientError());
		
		ingredientBody.put("name", "name");
		assertTrue(recipeEndpoint.postRecipeIngredient(recipeID, ingredientBody).getStatusCode().is4xxClientError());

		recipeIngredientRepository.drop();
		recipeRepository.drop();
		ingredientRepository.drop();
	}
}