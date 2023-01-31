package unimib.ingsof.persistence.view;

public class RecipeIngredientView {
	private String ingredientID;
	private String recipeID;
	private String name;
	private float quantity;

	public String getIngredientID() {
		return this.ingredientID;
	}
	
	public String getRecipeID() {
		return this.recipeID;
	}
	
	public float getQuantity() {
		return this.quantity;
	}
	
	public String getName() {
		return this.name;
	}
	
	public void setIngredientID(String ingredientID) {
		this.ingredientID = ingredientID;
	}
	
	public void setRecipeID(String recipeID) {
		this.recipeID = recipeID;
	}
	
	public void setQuantity(float quantity) {
		this.quantity = quantity;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public RecipeIngredientView() {
		super();
	}
	
	public RecipeIngredientView(String ingredientID, String recipeID, String name, float quantity) {
		super();
		this.ingredientID = ingredientID;
		this.recipeID = recipeID;
		this.name = name;
		this.quantity = quantity;
	}
}