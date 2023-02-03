package unimib.ingsof.logic;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import unimib.ingsof.exceptions.ValidationException;
import unimib.ingsof.exceptions.WrongIDGenerationInitialization;
import unimib.ingsof.generation.id.IDGenerationFacade;
import unimib.ingsof.persistence.repository.RecipeRepository;
import unimib.ingsof.validation.validators.RecipeInitializationValidator;

@Service
public class RecipeListController {
	@Autowired
	private RecipeRepository recipeRepository;
	
	public List<String> getAllRecipeIDs() {
		return recipeRepository.getAllRecipeIDs();
	}
	
	public List<String> getAllRecipeIDs(Optional<String> filterByName) {
		if (filterByName.isEmpty())
			return this.getAllRecipeIDs();
		return recipeRepository.getAllRecipeIDsByName(filterByName.get());
	}
	
	public String addRecipe(Map<String, String> recipeObject) throws ValidationException, WrongIDGenerationInitialization {
		recipeObject = RecipeInitializationValidator.getInstance().handle(recipeObject);
		String name = recipeObject.get("name");
		String description = recipeObject.get("description");
		String recipeID = IDGenerationFacade.getInstance().generateRecipeID(recipeObject);
		recipeRepository.addRecipe(recipeID, name, description);
		return recipeID;
	}
}