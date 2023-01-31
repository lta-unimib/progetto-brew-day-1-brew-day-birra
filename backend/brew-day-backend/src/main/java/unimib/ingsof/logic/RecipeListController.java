package unimib.ingsof.logic;

import java.util.ArrayList;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import unimib.ingsof.persistence.repository.RecipeRepository;

@Service
public class RecipeListController {
	@Autowired
	private RecipeRepository recipeRepository;
	
	public ArrayList<String> getAllRecipeIDs() {
		return recipeRepository.getAllRecipeIDs();
	}
	
	public ArrayList<String> getAllRecipeIDs(Optional<String> filterByName) {
		if (filterByName.isEmpty())
			return this.getAllRecipeIDs();
		return recipeRepository.getAllRecipeIDsByName(filterByName.get());
	}
	
	public String addRecipe(Map<String, String> recipeObject) throws Exception {
		if (recipeObject == null || recipeObject.get("name") == null)
            throw new Exception();
		try {
			String name = recipeObject.get("name");
			String recipeID = name;
			recipeRepository.addRecipe(recipeID, name);
			return recipeID;
		} catch(Exception exception) {
            throw exception;
		}
	}
}