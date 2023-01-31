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
		
		String recipeName = "RecipeControllerTest";
		String recipeID = recipeName;
		String ingredientName = recipeName;
		
		Map<String, String> recipeBody = new TreeMap<String, String>();
		recipeBody.put("name", recipeName);
		recipeListEndpoint.postRecipe(recipeBody).getStatusCode();
		
		assertTrue(recipeEndpoint.getRecipeByID(recipeID).getStatusCode().is2xxSuccessful());
		
		recipeBody.clear();
		recipeBody.put("name", recipeName);
		assertTrue(recipeEndpoint.updateRecipe(recipeName, recipeBody).getStatusCode().is2xxSuccessful());

		recipeBody.clear();
		recipeBody.put("name", ingredientName);
		recipeBody.put("quantity", "7");
		assertTrue(recipeEndpoint.postRecipeIngredient(recipeID, recipeBody).getStatusCode().is2xxSuccessful());
		assertFalse(recipeEndpoint.postRecipeIngredient(recipeID, recipeBody).getStatusCode().is2xxSuccessful());

		assertTrue(recipeEndpoint.deleteRecipe(recipeID).getStatusCode().is2xxSuccessful());
		assertTrue(recipeEndpoint.getRecipeByID(recipeID).getStatusCode().is4xxClientError());

		recipeIngredientsRepository.drop();
		recipesRepository.drop();
		ingredientsRepository.drop();

	}
	
	@Test
	void allGoesWrong() {
		ingredientsRepository.assure();
		recipesRepository.assure();
		recipeIngredientsRepository.assure();

		String recipeID = "name";
		Map<String, String> recipeBody = new TreeMap<String, String>();
		recipeBody.put("name", recipeID);

		assertTrue(recipeListEndpoint.postRecipe(recipeBody).getStatusCode().is2xxSuccessful());
		
		recipeBody = null;
		
		assertTrue(recipeEndpoint.updateRecipe(recipeID, recipeBody).getStatusCode().is4xxClientError());
		
		recipeBody = new TreeMap<>();
		assertTrue(recipeEndpoint.updateRecipe(recipeID, recipeBody).getStatusCode().is4xxClientError());

		assertTrue(recipeEndpoint.deleteRecipe(recipeID).getStatusCode().is2xxSuccessful());
		
		recipeBody.put("name", recipeID);
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

		recipeIngredientsRepository.drop();
		recipesRepository.drop();
		ingredientsRepository.drop();
	}
}