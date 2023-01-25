package unimib.ingsof.controller;

import static org.junit.Assert.assertTrue;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;

import java.util.Map;
import java.util.TreeMap;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import unimib.ingsof.model.IngredientRepository;
import unimib.ingsof.model.InventoryIngredientRepository;


@SpringBootTest
class InventoryControllerTest {

	@Autowired
	private InventoryController inventoryController;
	@Autowired
	private InventoryIngredientController inventoryIngredientController;
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
		
		assertTrue(inventoryController.postIngredient(ingredientBody).getStatusCode().is2xxSuccessful());
				
		//assertTrue(inventoryIngredientController.getIngredientByID(ingredientID).getStatusCode().is2xxSuccessful());
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