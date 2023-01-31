package unimib.ingsof.logic;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import unimib.ingsof.exceptions.WrongBodyException;
import unimib.ingsof.persistence.repository.RecipeRepository;

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
	
	public String addRecipe(Map<String, String> recipeObject) throws WrongBodyException {
		if (recipeObject == null || recipeObject.get("name") == null)
            throw new WrongBodyException();
		String description = "";
		if (recipeObject.get("description") != null)
			description = recipeObject.get("description");
		String name = recipeObject.get("name");
		String recipeID = name;
		recipeRepository.addRecipe(recipeID, name, description);
		return recipeID;
	}
}