package unimib.ingsof.controller;

import static org.junit.Assert.assertTrue;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;

import java.util.Map;
import java.util.TreeMap;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import unimib.ingsof.model.InventoryIngredientRepository;


@SpringBootTest
class InventoryControllerTest {

	@Autowired
	private InventoryController inventoryController;
	@Autowired
	private InventoryIngredientController ingredientController;
	@Autowired
	private InventoryIngredientRepository ingredientsRepository;

	
	@Test
	void testBehavior() {
		ingredientsRepository.assure();
		
		int oldnum = inventoryController.getAllIngredients().getBody().size();
		
		String ingredientID = "name";
		Map<String, String> ingredientBody = new TreeMap<String, String>();
		ingredientBody.put("name", ingredientID);
		ingredientBody.put("quantity", "7");
		inventoryController.postIngredient(ingredientBody);
		
		assertTrue(ingredientController.getIngredientByID(ingredientID).getStatusCode().is2xxSuccessful());
		assertEquals(oldnum + 1, inventoryController.getAllIngredients().getBody().size());
		
		assertFalse(inventoryController.postIngredient(ingredientBody).getStatusCode().is2xxSuccessful());
		assertEquals(oldnum + 1, inventoryController.getAllIngredients().getBody().size());
		
		

		ingredientsRepository.drop();
	}
}