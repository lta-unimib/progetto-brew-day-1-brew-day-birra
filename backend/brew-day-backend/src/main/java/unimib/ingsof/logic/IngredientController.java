package unimib.ingsof.logic;

import java.util.Map;
import java.util.TreeMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import unimib.ingsof.exceptions.WrongIDGenerationInitialization;
import unimib.ingsof.generation.id.IDGenerationFacade;
import unimib.ingsof.persistence.model.Ingredient;
import unimib.ingsof.persistence.repository.IngredientRepository;

@Service
public class IngredientController {
	@Autowired
	private IngredientRepository ingredientRepository;
	
	public Ingredient getIngredientByName(String name){
		return ingredientRepository.getIngredientByName(name);
	}

	public Ingredient addIngredient(String name) throws WrongIDGenerationInitialization {
		Ingredient ingredient = this.getIngredientByName(name);
		if(ingredient != null)
			return ingredient;

		Map<String, String> seed = new TreeMap<>(); seed.put("name", name);
		String ingredientID = IDGenerationFacade.getInstance().generateIngredientID(seed);
		ingredientRepository.addIngredient(ingredientID, name);
		return this.getIngredientByName(name);
	}

	public Ingredient getIngredient(String ingredientID) {
		return ingredientRepository.getIngredient(ingredientID);
	}
}