package unimib.ingsof.logic;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import unimib.ingsof.exceptions.WrongBodyException;
import unimib.ingsof.persistence.model.InventoryIngredient;
import unimib.ingsof.persistence.repository.InventoryIngredientRepository;
import unimib.ingsof.persistence.view.IngredientView;

@Service
public class InventoryController {
	@Autowired
	private InventoryIngredientRepository inventoryIngredientRepository;
	@Autowired
	private IngredientController ingredientController;

	public List<IngredientView> getAll() {
		ArrayList<InventoryIngredient> ingredients = inventoryIngredientRepository.getAll();
		ArrayList<IngredientView> result =  new ArrayList<>();
		for (InventoryIngredient ingredient : ingredients) {
			String name = ingredientController.getIngredient(ingredient.getIngredientID()).getName();
			result.add(new IngredientView(ingredient.getIngredientID(), name, ingredient.getQuantity()));
		}
		return result;
	}
	
	public String addIngredient(Map<String, String> ingredientObject) throws WrongBodyException, NumberFormatException {
		if (ingredientObject == null)
            throw new WrongBodyException();
		
        String name = ingredientObject.get("name");
        String quantity = ingredientObject.get("quantity");
		if (ingredientObject.get("name") == null)
	            throw new WrongBodyException();
		if (ingredientObject.get("quantity") == null)
	            throw new WrongBodyException();
		
        String ingredientID = ingredientController.addIngredient(name).getIngredientID();
        inventoryIngredientRepository.addIngredient(ingredientID, Float.valueOf(quantity));
        return ingredientID;
	}
}