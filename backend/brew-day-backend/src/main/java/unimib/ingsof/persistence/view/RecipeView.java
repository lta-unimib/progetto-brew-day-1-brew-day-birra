package unimib.ingsof.persistence.view;

import java.util.List;

public class RecipeView extends RecipeDetailsView {
	private List<RecipeIngredientView> ingredients;
	
	public RecipeView() {
		super();
	}
	
	public RecipeView(String recipeID, String name, String description, List<RecipeIngredientView> ingredients) {
		super(recipeID, name, description);
		this.ingredients = ingredients;
	}
	
	public List<RecipeIngredientView> getIngredients() {
		return this.ingredients;
	}
	
	public void setIngredients(List<RecipeIngredientView> ingredients) {
		this.ingredients = ingredients;
	}
}