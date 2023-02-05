package unimib.ingsof.logic;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import unimib.ingsof.exceptions.DoesntExistsException;
import unimib.ingsof.exceptions.ValidationException;
import unimib.ingsof.exceptions.WrongIDGenerationInitialization;
import unimib.ingsof.generation.id.IDGenerationFacade;
import unimib.ingsof.persistence.repository.RecipeRepository;
import unimib.ingsof.validation.validators.RecipeInitializationValidator;

@Service
public class RecipeListController {
	@Autowired
	private RecipeRepository recipeRepository;
	@Autowired
	private RecipeController recipeController;
	
	public List<String> getAllRecipeIDs(Optional<String> filterByName) {
		return recipeRepository.getAllRecipeIDsByName(filterByName.orElse(""));
	}
	
	public String addRecipe(Map<String, String> recipeObject) throws ValidationException, WrongIDGenerationInitialization {
		recipeObject = RecipeInitializationValidator.getInstance().handle(recipeObject);
		String name = recipeObject.get("name");
		String description = recipeObject.get("description");
		
		String recipeID = "";
		while(true) {
			try {
				recipeID = IDGenerationFacade.getInstance().generateRecipeID(recipeObject);
				recipeController.getRecipeDetailsByID(recipeID);
			} catch (DoesntExistsException exception) {
				break;
			}
		}
		
		recipeRepository.addRecipe(recipeID, name, description);
		return recipeID;
	}
}