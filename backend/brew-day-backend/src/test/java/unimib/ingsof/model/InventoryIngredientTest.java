package unimib.ingsof.model;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

class InventoryIngredientTest {
	@Test
	void testBehavior() {
		InventoryIngredient inventoryIngredient = new InventoryIngredient("name", 5);
		inventoryIngredient.setName("newName");
		inventoryIngredient.setQuantity(9);
		assertEquals("newName", inventoryIngredient.getName());
		assertEquals(9, inventoryIngredient.getQuantity());
	}
}
