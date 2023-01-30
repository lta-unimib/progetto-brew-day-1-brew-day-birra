package unimib.ingsof.api;

import java.util.ArrayList;
import java.util.Map;
import java.util.TreeMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import unimib.ingsof.logic.IngredientController;
import unimib.ingsof.persistence.model.Ingredient;
import unimib.ingsof.persistence.model.Recipe;
import unimib.ingsof.persistence.repository.RecipeIngredientRepository;
import unimib.ingsof.persistence.repository.RecipeRepository;

@RestController
@RequestMapping("/api/recipes/{recipeID}")
public class RecipeEndpoint {
	@Autowired
	private RecipeRepository recipeRepository;
	@Autowired
	private RecipeIngredientRepository recipeIngredientRepository;
	@Autowired
	IngredientController ingredientController;
	
	@GetMapping
	public ResponseEntity<Object> getRecipeByID(@PathVariable String recipeID) {
		String name = recipeRepository.getNameByID(recipeID);
		if (name == null)
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		
		Map<String, Object> response = new TreeMap<>();
		response.put("recipeID", recipeID);
		response.put("name", name);
		response.put("ingredients", recipeIngredientRepository.getAll(recipeID));
		
		return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
	@PutMapping
	public ResponseEntity<Recipe> updateRecipe(@PathVariable String recipeID,
												@RequestBody Map<String, String> body) {
		if (body == null)
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		String name = body.get("name");
		if (name != null) {
			ArrayList<Recipe> result = recipeRepository.updateRecipeName(recipeID, name);
			if (result.isEmpty())
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			return new ResponseEntity<>(result.get(0), HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}
	
	@DeleteMapping
	public ResponseEntity<Object> deleteRecipe(@PathVariable String recipeID) {
		recipeRepository.removeRecipe(recipeID);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@PostMapping
	public ResponseEntity<Object> postRecipeIngredient(@PathVariable String recipeID,
														@RequestBody Map<String, String> body) {
		if (body == null)
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		
		String name = body.get("name");
		String quantity = body.get("quantity");
		String ingredientID;
		
		if (name == null || quantity == null)
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		
		try {
			
			Ingredient ingrediente = ingredientController.getIngredientByName(name);
			
			if(ingrediente == null) {
        		ingrediente = ingredientController.addIngredient(name);
        		ingredientID = ingrediente.getIngredientID();
        	} else {
        		ingredientID = ingrediente.getIngredientID();
        	}
			
			recipeIngredientRepository.addRecipeIngredient(recipeID, ingredientID, Float.valueOf(quantity));
			HttpHeaders headers = new HttpHeaders();
			headers.add("Location",String.join("/api/recipes/%s/%s", recipeID, ingredientID));
	        return new ResponseEntity<>(headers, HttpStatus.CREATED);
		} catch(Exception exception) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
}