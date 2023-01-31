package unimib.ingsof.logic;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import unimib.ingsof.persistence.model.Ingredient;
import unimib.ingsof.persistence.repository.IngredientRepository;

@Service
public class IngredientController {
	@Autowired
	private IngredientRepository ingredientRepository;
	
	public Ingredient getIngredientByName(String name){
		return ingredientRepository.getIngredientByName(name);
	}

	public Ingredient addIngredient(String name) {
		String ingredientID = name;
		ingredientRepository.addIngredient(ingredientID, name);
		return this.getIngredientByName(name);
	}

	public Ingredient getIngredient(String ingredientID) {
		return ingredientRepository.getIngredient(ingredientID);
	}
}