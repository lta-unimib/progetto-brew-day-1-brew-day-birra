package unimib.ingsof.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class IngredientInstance {
	@Id
	private String name;
	private Float quantity;
	
	public IngredientInstance() {
		super();
	}
	
	public IngredientInstance(String name, Float quantity) {
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
	
	public Float getQuantity() {
		return quantity;
	}
	
	public void setQuantity(Float quantity) {
		this.quantity = quantity;
	}
	
}
