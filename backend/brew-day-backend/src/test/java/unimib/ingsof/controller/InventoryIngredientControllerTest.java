package unimib.ingsof.controller;

import static org.junit.Assert.assertTrue;
import static org.junit.Assert.assertEquals;

import java.util.Map;
import java.util.TreeMap;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import unimib.ingsof.model.InventoryIngredientRepository;


@SpringBootTest
class InventoryIngredientControllerTest {

	@Autowired
	private InventoryController inventoryController;
	@Autowired
	private InventoryIngredientController ingredientController;
	@Autowired
	private InventoryIngredientRepository ingredientsRepository;

	
	@Test
	void testBehavior() {
		ingredientsRepository.assure();
		
		String ingredientID = "name";
		Map<String, String> ingredientBody = new TreeMap<String, String>();
		ingredientBody.put("name", ingredientID);
		ingredientBody.put("quantity", "7");
		inventoryController.postIngredient(ingredientBody);
		
		assertTrue(ingredientController.getIngredientByID(ingredientID).getStatusCode().is2xxSuccessful());
		assertTrue(ingredientController.getIngredientByID(null).getStatusCode().is4xxClientError());
		assertTrue(ingredientController.getIngredientByID("ingredienteNonPresente").getStatusCode().is4xxClientError());

		ingredientBody.clear();
		
		assertTrue(ingredientController.updateIngredient(ingredientID, ingredientBody).getStatusCode().is4xxClientError());
		assertTrue(ingredientController.updateIngredient(null, ingredientBody).getStatusCode().is4xxClientError());
		ingredientBody.put("name", ingredientID);
		ingredientBody.put("quantity", "17");
		assertTrue(ingredientController.updateIngredient("ingredienteNonPresente", ingredientBody).getStatusCode().is4xxClientError());
		assertTrue(ingredientController.updateIngredient(ingredientID, ingredientBody).getStatusCode().is2xxSuccessful());
		assertEquals(17, ingredientController.getIngredientByID(ingredientID).getBody().getQuantity(), 0.1);
		
		assertTrue(ingredientController.deleteIngredient(ingredientID).getStatusCode().is2xxSuccessful());
		assertTrue(ingredientController.deleteIngredient(null).getStatusCode().is4xxClientError());
		assertTrue(ingredientController.getIngredientByID(ingredientID).getStatusCode().is4xxClientError());

		ingredientsRepository.drop();
	}
}
