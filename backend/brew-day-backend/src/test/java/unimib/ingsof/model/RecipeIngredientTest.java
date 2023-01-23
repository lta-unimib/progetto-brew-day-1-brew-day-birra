package unimib.ingsof.model;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

public class RecipeIngredientTest {
	@Test
	void testBehavior() {
		RecipeIngredient recipeIngredient = new RecipeIngredient("ingredientID", "recipeID", 7);
		recipeIngredient.setIngredientID("newIngredientID");
		recipeIngredient.setRecipeID("newRecipeID");
		recipeIngredient.setQuantity(17);
		assertEquals("newIngredientID", recipeIngredient.getIngredientID());
		assertEquals("newRecipeID", recipeIngredient.getRecipeID());
		assertEquals(17, recipeIngredient.getQuantity());
	}
}
