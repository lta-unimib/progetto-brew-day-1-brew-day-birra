package unimib.ingsof.persistence.model;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

class IngredientInstanceTest {
	@Test
	void testBehavior() {
		IngredientInstance ingredient = new IngredientInstance();
		ingredient = new IngredientInstance("recipeID", 7);
		ingredient.setName("newRecipeName");
		ingredient.setQuantity(7);
		assertEquals(7, ingredient.getQuantity());
		assertEquals("newRecipeName", ingredient.getName());
	}
}
