package unimib.ingsof.api;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import unimib.ingsof.logic.ResetController;
import unimib.ingsof.persistence.service.Protocol;

@SpringBootTest
class ShoppingEndpointTest {
	@Autowired
	private RecipeListEndpoint recipeListEndpoint;
	@Autowired
	private RecipeEndpoint recipeEndpoint;
	@Autowired
	private InventoryEndpoint inventoryEndpoint;	
	@Autowired
	private InventoryIngredientEndpoint inventoryIngredientEndpoint;
	@Autowired
	private ShoppingEndpoint shoppingEndpoint;
	@Autowired
	ResetController resetController;
	
	@Test
	void testBehaviorGet() {
		resetController.doAssure();
		
		Map<String, String> recipeBody = new TreeMap<>();
		recipeBody.put(Protocol.NAME_KEY, "ricetta");
		String recipeID = recipeListEndpoint.postRecipe(recipeBody).getHeaders().getFirst("recipeID");

		Map<String, String> ingredientBody = new TreeMap<>();
		ingredientBody.put(Protocol.NAME_KEY, "ingrediente");
		ingredientBody.put(Protocol.QUANTITY_KEY, "7");
		String ingredientID = recipeEndpoint.postRecipeIngredient(recipeID, ingredientBody).getHeaders().getFirst("ingredientID");
		inventoryEndpoint.postIngredient(ingredientBody);
		
		assertTrue(shoppingEndpoint.getShoppingList(recipeID, null).getStatusCode().is2xxSuccessful());
		
		Map<String, String> requestBody = new TreeMap<>();
		assertTrue(shoppingEndpoint.getShoppingList(recipeID, requestBody).getBody().isEmpty());
		
		ingredientBody.clear();
		ingredientBody.put(Protocol.QUANTITY_KEY, "5");
		inventoryIngredientEndpoint.updateIngredient(ingredientID, ingredientBody);
		
		assertFalse(shoppingEndpoint.getShoppingList(recipeID, null).getBody().isEmpty());

		assertTrue(shoppingEndpoint.getShoppingList("id", null).getStatusCode().is4xxClientError());

		resetController.doDrop();
	}
	
	@Test
	void testBehaviorPost() {
		resetController.doAssure();
		List<Map<String, String>> ingredients = new ArrayList<>();
		for (int i = 1; i < 11; i++) {
			Map<String, String> ingredientObject = new TreeMap<>();
			ingredientObject.put(Protocol.NAME_KEY, String.format("ingredient#%d", i%2));
			ingredientObject.put(Protocol.QUANTITY_KEY, Float.toString(i));
			ingredients.add(ingredientObject);
		}
		assertTrue(shoppingEndpoint.postShoppingList(ingredients).getStatusCode().is2xxSuccessful());

		ingredients.clear();
		for (int i = 0; i < 1; i++) {
			Map<String, String> ingredientObject = new TreeMap<>();
			ingredientObject.put(Protocol.NAME_KEY, String.format("ingredient#%d", i));
			ingredientObject.put(Protocol.QUANTITY_KEY, Float.toString(-10));
			ingredients.add(ingredientObject);
		}
		assertTrue(shoppingEndpoint.postShoppingList(ingredients).getStatusCode().is4xxClientError());
		resetController.doDrop();
	}
}
