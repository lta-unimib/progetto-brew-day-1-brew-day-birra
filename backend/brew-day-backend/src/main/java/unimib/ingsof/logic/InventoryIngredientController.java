package unimib.ingsof.logic;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import unimib.ingsof.exceptions.DoesntExistsException;
import unimib.ingsof.exceptions.ValidationException;
import unimib.ingsof.persistence.model.Ingredient;
import unimib.ingsof.persistence.model.InventoryIngredient;
import unimib.ingsof.persistence.repository.InventoryIngredientRepository;
import unimib.ingsof.persistence.service.Protocol;
import unimib.ingsof.persistence.view.IngredientView;
import unimib.ingsof.validation.validators.IngredientUpdatingValidator;

@Service
public class InventoryIngredientController {
	@Autowired
	private InventoryIngredientRepository inventoryIngredientRepository;
	
	private static InventoryIngredientController instance = null;
	public static InventoryIngredientController getInstance() {
		return InventoryIngredientController.instance;
	}
	public static void createInstance(InventoryIngredientController instance) {
		InventoryIngredientController.instance = instance;
	}
	
	public IngredientView getIngredient(String ingredientID) throws DoesntExistsException {
		InventoryIngredient inventoryIngredient = inventoryIngredientRepository.getIngredient(ingredientID);
		Ingredient ingredient = IngredientController.getInstance().getIngredient(ingredientID);
		if (ingredient == null || inventoryIngredient == null)
			throw new DoesntExistsException();
		
		return new IngredientView(inventoryIngredient.getIngredientID(),
										ingredient.getName(),
										inventoryIngredient.getQuantity());
	}

	public IngredientView updateIngredient(String ingredientID, Map<String, String> ingredientObject) throws ValidationException, DoesntExistsException {
		ingredientObject = IngredientUpdatingValidator.getInstance().handle(ingredientObject);
		float quantity = Float.parseFloat(ingredientObject.get(Protocol.QUANTITY_BODY_KEY));
		
		IngredientView ingredient = this.getIngredient(ingredientID);
		inventoryIngredientRepository.updateIngredient(ingredientID, quantity);
		ingredient.setQuantity(quantity);
		return ingredient;
	}

	public void deleteIngredient(String ingredientID) {
		this.inventoryIngredientRepository.deleteIngredient(ingredientID);
	}
}