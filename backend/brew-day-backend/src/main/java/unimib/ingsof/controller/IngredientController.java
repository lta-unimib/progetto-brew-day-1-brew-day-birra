package unimib.ingsof.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import unimib.ingsof.model.Ingredient;
import unimib.ingsof.model.IngredientRepository;

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
		return ingredientRepository.getIngredientByName(name);
	}

}
