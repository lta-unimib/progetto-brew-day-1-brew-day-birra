package unimib.ingsof.model;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

class RecipeTest {
	@Test
	void testBehavior() {
		Recipe recipe = new Recipe("recipeID", "recipeName");
		recipe.setName("newRecipeName");
		recipe.setRecipeID("newRecipeID");
		assertEquals("newRecipeID", recipe.getRecipeID());
		assertEquals("newRecipeName", recipe.getName());
	}
}
