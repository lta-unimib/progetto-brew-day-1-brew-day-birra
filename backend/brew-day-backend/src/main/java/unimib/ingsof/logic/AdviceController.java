package unimib.ingsof.logic;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import unimib.ingsof.exceptions.DoesntExistsException;
import unimib.ingsof.exceptions.InternalServerException;
import unimib.ingsof.persistence.model.RecipeIngredient;
import unimib.ingsof.persistence.repository.RecipeIngredientRepository;
import unimib.ingsof.persistence.view.AdviceView;

@Service
public class AdviceController {

	@Autowired
	private RecipeIngredientRepository recipeIngredientRepository;
	@Autowired
	RecipeController recipeController;
	@Autowired
	RecipeListController recipeListController;
	@Autowired
	InventoryIngredientController inventoryIngredientController;
	@Autowired
	private SettingController settingController;
	
	public AdviceView getAdvice() throws Exception {
		List<String> recipeIDs = recipeListController.getAllRecipeIDs(java.util.Optional.empty());
		if (recipeIDs.isEmpty())
			throw new DoesntExistsException();
		float equipment = 0;
		try {
			equipment = Float.parseFloat(settingController.getEquipment());
		} catch (Exception e) {
			throw new InternalServerException();
		}
		AdviceView advice = new AdviceView();
		float maxQuantitySum = 0;
		for (String recipeID : recipeIDs) {
			List<RecipeIngredient> ingredients =  recipeIngredientRepository.getAll(recipeID);
			List<Float> ingredientsQuantity = new ArrayList<>();
			float literProduced = -1;
			float quantitySum = 0;
			for (RecipeIngredient recipeIngredient : ingredients) {
				ingredientsQuantity.add(recipeIngredient.getQuantity());
				literProduced = ratioCalculator(recipeIngredient, literProduced);
			}
			if (literProduced > equipment)
				literProduced = equipment;
			quantitySum = ingredientQuantitySum(ingredientsQuantity, literProduced);
			if(quantitySum > maxQuantitySum ||
					(Float.compare(quantitySum, maxQuantitySum) == 0 && advice.getQuantity() < literProduced)) {
				maxQuantitySum = quantitySum;
				advice.setQuantity(literProduced);
				advice.setRecipeID(recipeID);	
			}
		}
		return advice;
	}
	
	private float ingredientQuantitySum(List<Float> ingredientsQuantity, float ratio) {
		float quantitySum = 0;
		for (float ingredientQuantity : ingredientsQuantity) {
			quantitySum += ingredientQuantity*ratio;
		}
		return quantitySum;
	}
	
	private float ratioCalculator(RecipeIngredient recipeIngredient, float maxLiterProduced) {
		String ingredientID = recipeIngredient.getIngredientID();
		float invIngQuantity;
		try {
			invIngQuantity = inventoryIngredientController.getIngredient(ingredientID).getQuantity();
		} catch (DoesntExistsException e) {
			return 0;
		}
		float ratioIngredient = invIngQuantity/recipeIngredient.getQuantity();
		if (ratioIngredient < maxLiterProduced || maxLiterProduced < 0)
			maxLiterProduced = ratioIngredient;
		return maxLiterProduced;
		
	}
	
	
}
