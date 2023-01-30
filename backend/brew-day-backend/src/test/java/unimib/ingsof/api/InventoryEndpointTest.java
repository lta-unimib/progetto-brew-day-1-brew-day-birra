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
class InventoryEndpointTest {

	@Autowired
	private InventoryEndpoint inventoryController;
	@Autowired
	private InventoryIngredientEndpoint inventoryIngredientController;
	@Autowired
	private InventoryIngredientRepository inventoryIngredientsRepository;
	@Autowired
	private IngredientRepository ingredientsRepository;
	
	
	@Test
	void testBehavior() {
		ingredientsRepository.assure();
		inventoryIngredientsRepository.assure();
		
		int oldnum = inventoryController.getAllIngredients().getBody().size();
		
		String name = "name";
		Map<String, String> ingredientBody = new TreeMap<String, String>();
		ingredientBody.put("name", name);
		ingredientBody.put("quantity", "7");
		
		//assertTrue(inventoryController.postIngredient(ingredientBody).getStatusCode().is2xxSuccessful());
		String ingredientID = inventoryController.postIngredient(ingredientBody).getHeaders().get("Location").get(0);
		inventoryIngredientController.getIngredientByID(name);
		assertTrue(inventoryIngredientController.getIngredientByID(ingredientID).getStatusCode().is2xxSuccessful());
		assertEquals(oldnum + 1, inventoryController.getAllIngredients().getBody().size());
		
		assertFalse(inventoryController.postIngredient(ingredientBody).getStatusCode().is2xxSuccessful());
		assertEquals(oldnum + 1, inventoryController.getAllIngredients().getBody().size());
		
		assertFalse(inventoryController.postIngredient(null).getStatusCode().is2xxSuccessful());
		assertEquals(oldnum + 1, inventoryController.getAllIngredients().getBody().size());	

		inventoryIngredientsRepository.drop();
		ingredientsRepository.drop();

	}
	
	@Test
	void allGoesWrong() {
		inventoryIngredientsRepository.drop();
		inventoryIngredientsRepository.assure();
		inventoryIngredientsRepository.assure();
		ingredientsRepository.drop();

		String ingredientID = "name";
		Map<String, String> ingredientBody = new TreeMap<String, String>();
		
		ingredientBody.put("name", ingredientID);
		assertTrue(inventoryController.postIngredient(ingredientBody).getStatusCode().is4xxClientError());
		
		ingredientBody.clear();
		ingredientBody.put("quantity", "7");
		assertTrue(inventoryController.postIngredient(ingredientBody).getStatusCode().is4xxClientError());
		
		ingredientBody.clear();
		assertTrue(inventoryController.postIngredient(ingredientBody).getStatusCode().is4xxClientError());

		inventoryIngredientsRepository.drop();
		ingredientsRepository.drop();

	}
}