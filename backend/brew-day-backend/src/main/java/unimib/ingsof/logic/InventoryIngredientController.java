package unimib.ingsof.logic;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import unimib.ingsof.exceptions.DoesntExistsException;
import unimib.ingsof.exceptions.ValidationException;
import unimib.ingsof.persistence.model.Ingredient;
import unimib.ingsof.persistence.model.InventoryIngredient;
import unimib.ingsof.persistence.repository.InventoryIngredientRepository;
import unimib.ingsof.persistence.view.IngredientView;
import unimib.ingsof.validation.validators.IngredientUpdatingValidator;

@Service
public class InventoryIngredientController {
	@Autowired
	private InventoryIngredientRepository inventoryIngredientRepository;
	@Autowired
	private IngredientController ingredientController;
	
	public IngredientView getIngredient(String ingredientID) throws DoesntExistsException {
		InventoryIngredient inventoryIngredient = inventoryIngredientRepository.getIngredient(ingredientID);
		Ingredient ingredient = ingredientController.getIngredient(ingredientID);
		if (ingredient == null)
			throw new DoesntExistsException();
		if (inventoryIngredient == null)
			throw new DoesntExistsException();
		
		return new IngredientView(inventoryIngredient.getIngredientID(),
										ingredient.getName(),
										inventoryIngredient.getQuantity());
	}

	public IngredientView updateIngredient(String ingredientID, Map<String, String> ingredientObject) throws ValidationException, DoesntExistsException {
		ingredientObject = IngredientUpdatingValidator.getInstance().handle(ingredientObject);
		float quantity = Float.parseFloat(ingredientObject.get("quantity"));
		
		InventoryIngredient inventoryIngredient = inventoryIngredientRepository.getIngredient(ingredientID);
		if (inventoryIngredient == null)
			throw new DoesntExistsException();
			
		inventoryIngredientRepository.updateIngredient(ingredientID, quantity);
		return this.getIngredient(ingredientID);
	}

	public void deleteIngredient(String ingredientID) {
		this.inventoryIngredientRepository.deleteIngredient(ingredientID);
	}
}