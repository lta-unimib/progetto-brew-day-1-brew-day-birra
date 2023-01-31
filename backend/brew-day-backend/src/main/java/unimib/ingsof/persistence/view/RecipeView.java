package unimib.ingsof.persistence.view;

import java.util.ArrayList;

public class RecipeView {
	private String recipeID;
	private String name;
	private ArrayList<RecipeIngredientView> ingredients;
	
	public RecipeView() {
		super();
	}
	
	public RecipeView(String recipeID, String name) {
		this(recipeID, name, new ArrayList<>());
	}
	
	public RecipeView(String recipeID, String name, ArrayList<RecipeIngredientView> ingredients) {
		super();
		this.recipeID = recipeID;
		this.name = name;
		this.ingredients = ingredients;
	}
	
	public String getRecipeID() {
		return this.recipeID;
	}
	
	public String getName() {
		return this.name;
	}
	
	public ArrayList<RecipeIngredientView> getIngredients() {
		return this.ingredients;
	};
	
	public void setRecipeID(String recipeID) {
		this.recipeID = recipeID;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public void setIngredients(ArrayList<RecipeIngredientView> ingredients) {
		this.ingredients = ingredients;
	}
}