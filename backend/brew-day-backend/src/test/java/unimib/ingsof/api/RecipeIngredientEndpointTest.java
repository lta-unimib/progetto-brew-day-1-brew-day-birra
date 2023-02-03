package unimib.ingsof.api;

import static org.junit.Assert.assertTrue;
import static org.junit.Assert.assertEquals;

import java.util.Map;
import java.util.TreeMap;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import unimib.ingsof.persistence.repository.IngredientRepository;
import unimib.ingsof.persistence.repository.RecipeIngredientRepository;
import unimib.ingsof.persistence.repository.RecipeRepository;

@SpringBootTest
class RecipeIngredientEndpointTest {
	@Autowired
	private RecipeListEndpoint recipeListEndpoint;
	@Autowired
	private RecipeEndpoint recipeEndpoint;
	@Autowired
	private RecipeIngredientEndpoint recipeIngredientEndpoint;
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
		
		String recipeName = "RecipeIngredientControllerTest";
		String ingredientID = recipeName;
		Map<String, String> recipeBody = new TreeMap<String, String>();
		recipeBody.put("name", recipeName);
		String recipeID = recipeListEndpoint.postRecipe(recipeBody).getHeaders().getFirst("recipeID");

		assertTrue(recipeIngredientEndpoint.getRecipeIngredientByID(recipeID, ingredientID).getStatusCode().is4xxClientError());
		
		Map<String, String> ingredientBody = new TreeMap<String, String>();
		ingredientBody.put("name", ingredientID);
		ingredientBody.put("quantity", "7");
		ingredientID = recipeEndpoint.postRecipeIngredient(recipeID, ingredientBody).getHeaders().getFirst("ingredientID");
		
		assertTrue(recipeIngredientEndpoint.getRecipeIngredientByID(recipeID, ingredientID).getStatusCode().is2xxSuccessful());
		
		ingredientBody.clear();
		ingredientBody.put("quantity", "17");
		assertTrue(recipeIngredientEndpoint.updateRecipeIngredient(recipeID, ingredientID, ingredientBody).getStatusCode().is2xxSuccessful());
		assertEquals(17, recipeIngredientEndpoint.getRecipeIngredientByID(recipeID, ingredientID).getBody().getQuantity(), 0.1);
		
		assertTrue(recipeIngredientEndpoint.deleteRecipeIngredient(recipeID, ingredientID).getStatusCode().is2xxSuccessful());
		assertTrue(recipeIngredientEndpoint.getRecipeIngredientByID(recipeID, ingredientID).getStatusCode().is4xxClientError());

		recipeIngredientRepository.drop();
		recipeRepository.drop();
		ingredientRepository.drop();
	}
	
	@Test
	void allGoesWrong() {
		ingredientRepository.assure();
		recipeRepository.assure();
		recipeIngredientRepository.assure();
		
		String recipeName = "RecipeIngredientControllerTest";
		String ingredientID = recipeName;
		
		Map<String, String> recipeBody = new TreeMap<>();
		recipeBody.put("name", recipeName);
		String recipeID = recipeListEndpoint.postRecipe(recipeBody).getHeaders().getFirst("recipeID");
		
		Map<String, String> ingredientBody = null;
		assertTrue(recipeIngredientEndpoint.updateRecipeIngredient(recipeID, ingredientID, ingredientBody).getStatusCode().is4xxClientError());
		
		ingredientBody = new TreeMap<>();
		assertTrue(recipeIngredientEndpoint.updateRecipeIngredient(recipeID, ingredientID, ingredientBody).getStatusCode().is4xxClientError());
		
		ingredientBody.put("quantity", ingredientID);
		assertTrue(recipeIngredientEndpoint.updateRecipeIngredient(recipeID, ingredientID, ingredientBody).getStatusCode().is4xxClientError());
		
		ingredientBody.put("quantity", "17");
		assertTrue(recipeIngredientEndpoint.updateRecipeIngredient(recipeID, ingredientID, ingredientBody).getStatusCode().is4xxClientError());
		
		recipeIngredientRepository.drop();
		recipeRepository.drop();
		ingredientRepository.drop();
	}
}