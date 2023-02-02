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
	private InventoryEndpoint inventoryEndpoint;
	@Autowired
	private InventoryIngredientEndpoint ingredientEndpoint;
	@Autowired
	private IngredientRepository ingredientRepository;
	@Autowired
	private InventoryIngredientRepository inventoryIngredientRepository;

	@Test
	void testBehavior() {
		ingredientRepository.assure();
		inventoryIngredientRepository.assure();
		
		String ingredientName = "name";
		Map<String, String> ingredientBody = new TreeMap<String, String>();
		ingredientBody.put("name", ingredientName);
		ingredientBody.put("quantity", "7");
		String ingredientID = inventoryEndpoint.postIngredient(ingredientBody).getHeaders().getFirst("ingredientID");
		
		assertTrue(ingredientEndpoint.getIngredientByID(ingredientID).getStatusCode().is2xxSuccessful());
		assertTrue(ingredientEndpoint.getIngredientByID(null).getStatusCode().is4xxClientError());
		assertTrue(ingredientEndpoint.getIngredientByID("ingredienteNonPresente").getStatusCode().is4xxClientError());
		
		ingredientBody = null;
		assertTrue(ingredientEndpoint.updateIngredient(ingredientID, ingredientBody).getStatusCode().is4xxClientError());

		ingredientBody = new TreeMap<String, String>();
		assertTrue(ingredientEndpoint.updateIngredient(ingredientID, ingredientBody).getStatusCode().is4xxClientError());
		assertTrue(ingredientEndpoint.updateIngredient(null, ingredientBody).getStatusCode().is4xxClientError());
		
		ingredientBody.put("quantity", "17");
		
		assertFalse(ingredientEndpoint.updateIngredient("ingredienteNonPresente", ingredientBody).getStatusCode().is2xxSuccessful());
		assertTrue(ingredientEndpoint.updateIngredient(ingredientID, ingredientBody).getStatusCode().is2xxSuccessful());
		assertEquals(17, ingredientEndpoint.getIngredientByID(ingredientID).getBody().getQuantity(), 0.1);
		
		ingredientBody.clear();
		ingredientBody.put("quantity", "ciao");
		assertTrue(ingredientEndpoint.updateIngredient(ingredientID, ingredientBody).getStatusCode().is4xxClientError());

		
		assertTrue(ingredientEndpoint.deleteIngredient(ingredientID).getStatusCode().is2xxSuccessful());
		assertTrue(ingredientEndpoint.getIngredientByID(ingredientID).getStatusCode().is4xxClientError());
		
		inventoryIngredientRepository.drop();
		ingredientRepository.drop();
	}
}
