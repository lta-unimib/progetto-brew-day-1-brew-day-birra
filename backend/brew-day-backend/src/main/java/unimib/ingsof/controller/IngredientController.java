package unimib.ingsof.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import unimib.ingsof.model.Ingredient;
import unimib.ingsof.model.IngredientRepository;

@Service
public class IngredientController {
	
	@Autowired
	private IngredientRepository ingredientRepository;

	
	public ArrayList<Ingredient> getAllIngredients() {
		ArrayList<Ingredient> result = ingredientRepository.getAllIngredients();
		return result;
    }
	
	public Ingredient getIngredientByName(String name){	
		Ingredient result;
		try {
			result = ingredientRepository.getIngredientByName(name);			
		} catch(Exception e) {
			System.out.println("ecc " + e );
			return null;
		}
		return result;
	}

	public Ingredient addIngredient(String name) {
		System.out.println("sto per aggiungere");
		ingredientRepository.addIngredient(name);
		System.out.println("ho aggiunto");

		return ingredientRepository.getIngredientByName(name);
	}

}
