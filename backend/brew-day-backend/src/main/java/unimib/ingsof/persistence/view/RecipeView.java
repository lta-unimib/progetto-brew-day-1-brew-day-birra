package unimib.ingsof.persistence.view;

import java.util.ArrayList;
import java.util.List;

public class RecipeView {
	private String recipeID;
	private String name;
	private String description;
	private List<RecipeIngredientView> ingredients;
	
	public RecipeView() {
		super();
	}
	
	public RecipeView(String recipeID, String name, String description) {
		this(recipeID, name, description, new ArrayList<>());
	}
	
	public RecipeView(String recipeID, String name, String description, List<RecipeIngredientView> ingredients) {
		super();
		this.recipeID = recipeID;
		this.name = name;
		this.description = description;
		this.ingredients = ingredients;
	}
	
	public String getRecipeID() {
		return this.recipeID;
	}
	
	public String getName() {
		return this.name;
	}
	
	public String getDescription() {
		return this.description;
	}
	
	public List<RecipeIngredientView> getIngredients() {
		return this.ingredients;
	}
	
	public void setRecipeID(String recipeID) {
		this.recipeID = recipeID;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public void setDescription(String description) {
		this.description = description;
	}
	
	public void setIngredients(List<RecipeIngredientView> ingredients) {
		this.ingredients = ingredients;
	}
}