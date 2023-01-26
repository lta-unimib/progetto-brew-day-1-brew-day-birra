package unimib.ingsof.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class IngredientInstance {
	@Id
	private String name;
	private float quantity;
	
	public IngredientInstance() {
		super();
	}
	
	public IngredientInstance(String name, float quantity) {
		super();
		this.name = name;
		this.quantity = quantity;
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public float getQuantity() {
		return quantity;
	}
	
	public void setQuantity(float quantity) {
		this.quantity = quantity;
	}
	
}
