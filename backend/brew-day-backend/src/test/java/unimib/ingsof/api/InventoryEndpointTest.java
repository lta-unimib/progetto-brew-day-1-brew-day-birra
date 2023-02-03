package unimib.ingsof.api;

import static org.junit.Assert.assertTrue;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;

import java.util.Map;
import java.util.TreeMap;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import unimib.ingsof.logic.ResetController;


@SpringBootTest
class InventoryEndpointTest {
	@Autowired
	private InventoryEndpoint inventoryEndpoint;
	@Autowired
	private InventoryIngredientEndpoint inventoryIngredientEndpoint;
	@Autowired
	ResetController resetController;
	
	@Test
	void testBehavior() {
		resetController.doAssure();
		
		int oldnum = inventoryEndpoint.getAllIngredients().getBody().size();
		
		String name = "name";
		Map<String, String> ingredientBody = new TreeMap<String, String>();
		ingredientBody.put("name", name);
		ingredientBody.put("quantity", "7");
		
		//assertTrue(inventoryController.postIngredient(ingredientBody).getStatusCode().is2xxSuccessful());
		String ingredientID = inventoryEndpoint.postIngredient(ingredientBody).getHeaders().get("ingredientID").get(0);
		inventoryIngredientEndpoint.getIngredientByID(name);
		assertTrue(inventoryIngredientEndpoint.getIngredientByID(ingredientID).getStatusCode().is2xxSuccessful());
		assertEquals(oldnum + 1, inventoryEndpoint.getAllIngredients().getBody().size());
		
		assertFalse(inventoryEndpoint.postIngredient(ingredientBody).getStatusCode().is2xxSuccessful());
		assertEquals(oldnum + 1, inventoryEndpoint.getAllIngredients().getBody().size());
		
		assertFalse(inventoryEndpoint.postIngredient(null).getStatusCode().is2xxSuccessful());
		assertEquals(oldnum + 1, inventoryEndpoint.getAllIngredients().getBody().size());	

		resetController.doDrop();

	}
	
	@Test
	void allGoesWrong() {
		resetController.doAssure();

		String ingredientID = "name";
		Map<String, String> ingredientBody = new TreeMap<String, String>();
		
		ingredientBody.put("name", ingredientID);
		assertTrue(inventoryEndpoint.postIngredient(ingredientBody).getStatusCode().is4xxClientError());
		
		ingredientBody.clear();
		ingredientBody.put("quantity", "7");
		assertTrue(inventoryEndpoint.postIngredient(ingredientBody).getStatusCode().is4xxClientError());
		
		ingredientBody.clear();
		assertTrue(inventoryEndpoint.postIngredient(ingredientBody).getStatusCode().is4xxClientError());

		resetController.doDrop();
	}
}