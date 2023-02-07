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
		float maxQuantity = 0;
		for (String recipeID : recipeIDs) {
			List<RecipeIngredient> ingredients =  recipeIngredientRepository.getAll(recipeID);
			List<Float> ingredientsQuantity = new ArrayList<>();
			float ratio = -1;
			float quantityTotal = 0;
			try {
				for (RecipeIngredient recipeIngredient : ingredients) {
					String ingredientID = recipeIngredient.getIngredientID();
					ingredientsQuantity.add(recipeIngredient.getQuantity());
					float invIngQuantity = inventoryIngredientController.getIngredient(ingredientID).getQuantity();
					float ratioIngredient = invIngQuantity/recipeIngredient.getQuantity();
					if (ratioIngredient < ratio || ratio < 0)
						ratio = ratioIngredient;
				}
				for (float ingredientQuantity : ingredientsQuantity) {
					quantityTotal += ingredientQuantity*ratio;
				}
			}catch(DoesntExistsException e) {
				continue;
			}
			if(quantityTotal > maxQuantity ||
					(Float.compare(quantityTotal, maxQuantity) == 0 && advice.getQuantity() < ratio)) {
				maxQuantity = quantityTotal;
				advice.setQuantity(ratio);
				advice.setRecipeID(recipeID);			
			}
				
		}
		return advice;
	}
}
