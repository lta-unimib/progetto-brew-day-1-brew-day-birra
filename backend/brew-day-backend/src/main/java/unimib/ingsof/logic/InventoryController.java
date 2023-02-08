package unimib.ingsof.logic;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import unimib.ingsof.exceptions.DoesntExistsException;
import unimib.ingsof.exceptions.ValidationException;
import unimib.ingsof.exceptions.WrongIDGenerationInitialization;
import unimib.ingsof.persistence.model.InventoryIngredient;
import unimib.ingsof.persistence.repository.InventoryIngredientRepository;
import unimib.ingsof.persistence.service.Protocol;
import unimib.ingsof.persistence.view.IngredientView;
import unimib.ingsof.validation.validators.IngredientInitializationValidator;

@Service
public class InventoryController {
	@Autowired
	private InventoryIngredientRepository inventoryIngredientRepository;
	@Autowired
	private IngredientController ingredientController;

	public List<IngredientView> getAll() throws DoesntExistsException {
		ArrayList<InventoryIngredient> ingredients = inventoryIngredientRepository.getAll();
		ArrayList<IngredientView> result =  new ArrayList<>();
		for (InventoryIngredient ingredient : ingredients) {
			String name = ingredientController.getIngredient(ingredient.getIngredientID()).getName();
			result.add(new IngredientView(ingredient.getIngredientID(), name, ingredient.getQuantity()));
		}
		return result;
	}
	
	public String addIngredient(Map<String, String> ingredientObject) throws ValidationException, WrongIDGenerationInitialization {
		ingredientObject = IngredientInitializationValidator.getInstance().handle(ingredientObject);
		String name = ingredientObject.get(Protocol.NAME_BODY_KEY);
		float quantity = Float.parseFloat(ingredientObject.get(Protocol.QUANTITY_BODY_KEY));
		
        String ingredientID = ingredientController.addIngredient(name).getIngredientID();
        inventoryIngredientRepository.addIngredient(ingredientID, quantity);
        return ingredientID;
	}
}