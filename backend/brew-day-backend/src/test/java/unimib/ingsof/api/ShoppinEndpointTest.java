package unimib.ingsof.api;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import java.util.Map;
import java.util.TreeMap;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import unimib.ingsof.persistence.repository.IngredientRepository;
import unimib.ingsof.persistence.repository.InventoryIngredientRepository;
import unimib.ingsof.persistence.repository.RecipeIngredientRepository;
import unimib.ingsof.persistence.repository.RecipeRepository;

@SpringBootTest
public class ShoppinEndpointTest {
	@Autowired
	private RecipeListEndpoint recipeListEndpoint;
	@Autowired
	private RecipeRepository recipeRepository;
	@Autowired
	private RecipeEndpoint recipeEndpoint;
	@Autowired
	private RecipeIngredientEndpoint recipeIngredientEndpoint;
	@Autowired
	private RecipeIngredientRepository recipeIngredientRepository;
	@Autowired
	private InventoryEndpoint inventoryEndpoint;	
	@Autowired
	private InventoryIngredientEndpoint inventoryIngredientEndpoint;
	@Autowired
	private InventoryIngredientRepository inventoryIngredientRepository;
	@Autowired
	private IngredientRepository ingredientRepository;
	@Autowired
	private ShoppingEndpoint shoppingEndpoint;
	
	@Test
	void testBehavior() {
		ingredientRepository.assure();
		recipeRepository.assure();
		recipeIngredientRepository.assure();
		inventoryIngredientRepository.assure();
		
		Map<String, String> recipeBody = new TreeMap<String, String>();
		recipeBody.put("name", "ricetta");
		String recipeID = recipeListEndpoint.postRecipe(recipeBody).getHeaders().getFirst("recipeID");

		Map<String, String> ingredientBody = new TreeMap<String, String>();
		ingredientBody.put("name", "ingrediente");
		ingredientBody.put("quantity", "7");
		String ingredientID = recipeEndpoint.postRecipeIngredient(recipeID, ingredientBody).getHeaders().getFirst("ingredientID");
		inventoryEndpoint.postIngredient(ingredientBody);
		
		assertTrue(shoppingEndpoint.getShoppingList(recipeID).getStatusCode().is2xxSuccessful());
		assertTrue(shoppingEndpoint.getShoppingList(recipeID).getBody().isEmpty());
		
		ingredientBody.clear();
		ingredientBody.put("quantity", "5");
		inventoryIngredientEndpoint.updateIngredient(ingredientID, ingredientBody);
		
		assertFalse(shoppingEndpoint.getShoppingList(recipeID).getBody().isEmpty());

		
		assertTrue(shoppingEndpoint.getShoppingList("id").getStatusCode().is4xxClientError());

		recipeIngredientRepository.drop();
		inventoryIngredientRepository.drop();
		recipeRepository.drop();
		ingredientRepository.drop();
	}
}
