package unimib.ingsof.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class InventoryIngredient {
	@Id
	private String name;
	private String quantity;

	public InventoryIngredient(String name, String quantity) {
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

	public String getQuantity() {
		return quantity;
	}

	public void setQuantity(String quantity) {
		this.quantity = quantity;
	}
	
}
