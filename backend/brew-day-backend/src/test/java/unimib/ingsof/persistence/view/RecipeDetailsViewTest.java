package unimib.ingsof.persistence.view;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

class RecipeDetailsViewTest {
	@Test
	void testBehavior() {
		RecipeDetailsView recipeDetailsView = new RecipeDetailsView("recipeID", "recipeName", "recipeDescription");
		recipeDetailsView = new RecipeView();
		recipeDetailsView.setName("newRecipeName");
		recipeDetailsView.setDescription("newRecipeDescription");
		recipeDetailsView.setRecipeID("newRecipeID");
		assertEquals("newRecipeID", recipeDetailsView.getRecipeID());
		assertEquals("newRecipeName", recipeDetailsView.getName());
		assertEquals("newRecipeDescription", recipeDetailsView.getDescription());
	}
}