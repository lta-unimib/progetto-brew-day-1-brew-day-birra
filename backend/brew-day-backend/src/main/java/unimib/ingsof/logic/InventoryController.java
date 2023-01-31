package unimib.ingsof.logic;

import java.util.ArrayList;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import unimib.ingsof.persistence.model.IngredientInstance;
import unimib.ingsof.persistence.repository.InventoryIngredientRepository;

@Service
public class InventoryController {
	@Autowired
	private InventoryIngredientRepository inventoryIngredientRepository;
	@Autowired
	private IngredientController ingredientController;

	public ArrayList<IngredientInstance> getAllIngredients() {
		ArrayList<IngredientInstance> result = inventoryIngredientRepository.getAllIngredients();
		return result;
	}
	
	public String addIngredient(Map<String, String> ingredientObject) throws Exception {
			if (ingredientObject == null)
	            throw new Exception();
			
	        String name = ingredientObject.get("name");
	        String quantity = ingredientObject.get("quantity");
			if (ingredientObject.get("name") == null)
		            throw new Exception();
			if (ingredientObject.get("quantity") == null)
		            throw new Exception();
			
	        String ingredientID = ingredientController.addIngredient(name).getIngredientID();
	        inventoryIngredientRepository.addIngredient(ingredientID, Float.valueOf(quantity));
	        return ingredientID;
	}
}