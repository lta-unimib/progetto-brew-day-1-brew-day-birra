package unimib.ingsof.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Recipe {
	@Id
	private String recipeID;
	private String name;
	
	public Recipe() {
		super();
	}
	
	public Recipe(String recipeID, String name) {
		super();
		this.recipeID = recipeID;
		this.name = name;
	}
	
	public String getRecipeID() {
		return recipeID;
	}
	
	public String getName() {
		return name;
	}
	
	public void setRecipeID(String recipeID) {
		this.recipeID = recipeID;
	}
	
	public void setName(String name) {
		this.name = name;
	}
}