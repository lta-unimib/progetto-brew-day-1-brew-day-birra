package unimib.ingsof.logic;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import unimib.ingsof.exceptions.DoesntExistsException;
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
	
	public AdviceView getAdvice() throws DoesntExistsException {
		List<String> recipeIDs = recipeListController.getAllRecipeIDs(java.util.Optional.empty());
		if (recipeIDs.isEmpty())
			throw new DoesntExistsException();
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
