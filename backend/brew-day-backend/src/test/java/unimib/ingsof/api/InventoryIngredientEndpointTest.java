package unimib.ingsof.api;

import static org.junit.Assert.assertTrue;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;

import java.util.Map;
import java.util.TreeMap;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import unimib.ingsof.persistence.repository.IngredientRepository;
import unimib.ingsof.persistence.repository.InventoryIngredientRepository;


@SpringBootTest
class InventoryIngredientEndpointTest {

	@Autowired
	private InventoryEndpoint inventoryController;
	@Autowired
	private InventoryIngredientEndpoint ingredientController;
	@Autowired
	private IngredientRepository ingredientRepository;
	@Autowired
	private InventoryIngredientRepository inventoryIngredientRepository;

	
	@Test
	void testBehavior() {
		ingredientRepository.assure();
		inventoryIngredientRepository.assure();
		
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
		
		ingredientBody.put("quantity", "17");
		
		assertFalse(ingredientController.updateIngredient("ingredienteNonPresente", ingredientBody).getStatusCode().is2xxSuccessful());
		assertTrue(ingredientController.updateIngredient(ingredientID, ingredientBody).getStatusCode().is2xxSuccessful());
		assertEquals(17, ingredientController.getIngredientByID(ingredientID).getBody().getQuantity(), 0.1);
		
		ingredientBody.clear();
		ingredientBody.put("quantity", "ciao");
		assertTrue(ingredientController.updateIngredient(ingredientID, ingredientBody).getStatusCode().is4xxClientError());

		
		assertTrue(ingredientController.deleteIngredient(ingredientID).getStatusCode().is2xxSuccessful());
		assertTrue(ingredientController.deleteIngredient(null).getStatusCode().is4xxClientError());
		assertTrue(ingredientController.getIngredientByID(ingredientID).getStatusCode().is4xxClientError());
		inventoryIngredientRepository.drop();
		ingredientRepository.drop();
	}
}
