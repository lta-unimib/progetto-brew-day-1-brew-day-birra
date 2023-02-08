package unimib.ingsof.logic;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import unimib.ingsof.exceptions.DoesntExistsException;
import unimib.ingsof.exceptions.InsufficientEquipmentException;
import unimib.ingsof.exceptions.InternalServerException;
import unimib.ingsof.exceptions.ValidationException;
import unimib.ingsof.exceptions.WrongIDGenerationInitialization;
import unimib.ingsof.persistence.service.Protocol;
import unimib.ingsof.persistence.view.IngredientView;
import unimib.ingsof.persistence.view.RecipeIngredientView;
import unimib.ingsof.persistence.view.RecipeView;
import unimib.ingsof.validation.validators.IngredientInitializationValidator;
import unimib.ingsof.validation.validators.ShoppingListCreationValidator;

@Service
public class ShoppingController {
	@Autowired
	RecipeController recipeController;
	@Autowired
	InventoryIngredientController inventoryIngredientController;
	@Autowired
	InventoryController inventoryController;
	@Autowired
	IngredientController ingredientController;
	@Autowired
	private SettingController settingController;
	
	public IngredientView probeInventoryIngredient(String ingredientID, String ingredientName) throws ValidationException, WrongIDGenerationInitialization {
		try {
			return inventoryIngredientController.getIngredient(ingredientID);
		} catch(DoesntExistsException exception) {
			Map<String, String> newIngredientObject = new TreeMap<>();
			newIngredientObject.put(Protocol.NAME_BODY_KEY, ingredientName);
			newIngredientObject.put(Protocol.QUANTITY_BODY_KEY, "0");
			return new IngredientView(inventoryController.addIngredient(newIngredientObject), ingredientName, 0);
		}
	}
	
	public List<IngredientView> getShoppingList(String recipeID, Map<String, String> requestBody) throws ValidationException, DoesntExistsException, InternalServerException, InsufficientEquipmentException, WrongIDGenerationInitialization {
		requestBody = ShoppingListCreationValidator.getInstance().handle(requestBody);
		float multiplier = Float.parseFloat(requestBody.get(Protocol.QUANTITY_BODY_KEY));
		return this.getShoppingList(recipeID, multiplier);
	}

	public List<IngredientView> getShoppingList(String recipeID, float multiplier) throws DoesntExistsException, InternalServerException, InsufficientEquipmentException, ValidationException, WrongIDGenerationInitialization {
		ArrayList<IngredientView> result = new ArrayList<>();
		RecipeView recipe = recipeController.getRecipeByID(recipeID);
		float equipment = 0;
		try {
			equipment = Float.parseFloat(settingController.getEquipment());
		} catch (Exception e) {
			throw new InternalServerException();
		}
		if (multiplier > equipment)
			throw new InsufficientEquipmentException();
		for (RecipeIngredientView recipeIngredient : recipe.getIngredients()) {
			String ingredientID = recipeIngredient.getIngredientID();
			float inventoryIngredientQuantity = this.probeInventoryIngredient(ingredientID, recipeIngredient.getName()).getQuantity();
			float recipeIngredientQuantity =  multiplier * recipeIngredient.getQuantity();
			if (recipeIngredientQuantity > inventoryIngredientQuantity)
				result.add(new IngredientView(ingredientID, recipeIngredient.getName(), recipeIngredientQuantity - inventoryIngredientQuantity));
		}
		return result;
	}
	
	public void postShoppingList(List<Map<String, String>> ingredients) throws ValidationException, WrongIDGenerationInitialization, DoesntExistsException {
		List<IngredientView> updateList = new ArrayList<>();
		for (Map<String, String> ingredientObject : ingredients) {
			ingredientObject = IngredientInitializationValidator.getInstance().handle(ingredientObject);
			String ingredientName = ingredientObject.get(Protocol.NAME_BODY_KEY);
			String ingredientID = ingredientController.addIngredient(ingredientName).getIngredientID();
			
			IngredientView inventoryIngredient = this.probeInventoryIngredient(ingredientID, ingredientName);
			inventoryIngredient.setQuantity(inventoryIngredient.getQuantity() + Float.parseFloat(ingredientObject.get(Protocol.QUANTITY_BODY_KEY)));
			updateList.add(inventoryIngredient);
		}
		
		for (IngredientView ingredient : updateList) {
			Map<String, String> newIngredientObject = new TreeMap<>();
			newIngredientObject.put(Protocol.QUANTITY_BODY_KEY, Float.toString(ingredient.getQuantity()));
			inventoryIngredientController.updateIngredient(ingredient.getIngredientID(), newIngredientObject);
		}
	}
}
