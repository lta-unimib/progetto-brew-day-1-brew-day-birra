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
	private RecipeIngredientEndpoint ingredientEndpoint;
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
		recipeListEndpoint.postRecipe(recipeBody);
		
		Map<String, String> ingredientBody = new TreeMap<String, String>();
		ingredientBody.put("name", ingredientID);
		ingredientBody.put("quantity", "7");
		recipeEndpoint.postRecipeIngredient(recipeID, ingredientBody);
		
		assertTrue(ingredientEndpoint.getRecipeIngredientByID(recipeID, ingredientID).getStatusCode().is2xxSuccessful());
		
		ingredientBody.clear();
		ingredientBody.put("quantity", "17");
		assertTrue(ingredientEndpoint.updateRecipeIngredient(recipeID, ingredientID, ingredientBody).getStatusCode().is2xxSuccessful());
		assertEquals(17, ingredientEndpoint.getRecipeIngredientByID(recipeID, ingredientID).getBody().getQuantity(), 0.1);
		
		assertTrue(ingredientEndpoint.deleteRecipeIngredient(recipeID, ingredientID).getStatusCode().is2xxSuccessful());
		assertTrue(ingredientEndpoint.getRecipeIngredientByID(recipeID, ingredientID).getStatusCode().is4xxClientError());

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
		recipeListEndpoint.postRecipe(recipeBody);
		
		Map<String, String> ingredientBody = null;
		assertTrue(ingredientEndpoint.updateRecipeIngredient(recipeID, ingredientID, ingredientBody).getStatusCode().is4xxClientError());
		
		ingredientBody = new TreeMap<>();
		assertTrue(ingredientEndpoint.updateRecipeIngredient(recipeID, ingredientID, ingredientBody).getStatusCode().is4xxClientError());
		
		ingredientBody.put("quantity", ingredientID);
		assertTrue(ingredientEndpoint.updateRecipeIngredient(recipeID, ingredientID, ingredientBody).getStatusCode().is4xxClientError());
		
		ingredientBody.put("quantity", "17");
		assertTrue(ingredientEndpoint.updateRecipeIngredient(recipeID, ingredientID, ingredientBody).getStatusCode().is4xxClientError());
		
		recipeIngredientsRepository.drop();
		recipesRepository.drop();
		ingredientsRepository.drop();
	}
}