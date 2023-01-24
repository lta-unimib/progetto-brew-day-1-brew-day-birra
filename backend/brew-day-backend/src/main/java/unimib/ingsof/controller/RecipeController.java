package unimib.ingsof.controller;

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

import unimib.ingsof.model.RecipeIngredientRepository;
import unimib.ingsof.model.RecipeRepository;

@RestController
@RequestMapping("/api/recipes/{recipeID}")
public class RecipeController {
	@Autowired
	private RecipeRepository recipesRepo;
	@Autowired
	private RecipeIngredientRepository ingredientsRepo;
	
	@GetMapping
	public ResponseEntity<Object> getRecipeByID(@PathVariable String recipeID) {
		String name = recipesRepo.getNameByID(recipeID);
		if (name == null)
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		
		Map<String, Object> response = new TreeMap<>();
		response.put("recipeID", recipeID);
		response.put("name", name);
		response.put("ingredients", ingredientsRepo.getAll(recipeID));
		
		return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
	@PutMapping
	public ResponseEntity<Object> updateRecipe(@PathVariable String recipeID,
												@RequestBody Map<String, String> body) {
		if (body == null)
			return new ResponseEntity<>(HttpStatus.OK);
		String name = body.get("name");
		if (name != null) {
			recipesRepo.updateRecipeName(recipeID, name);
			return new ResponseEntity<>(HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}
	
	@DeleteMapping
	public ResponseEntity<Object> deleteRecipe(@PathVariable String recipeID) {
		recipesRepo.removeRecipe(recipeID);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@PostMapping
	public ResponseEntity<Object> postRecipeIngredient(@PathVariable String recipeID,
														@RequestBody Map<String, String> body) {
		if (body == null)
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		
		String name = body.get("name");
		String quantity = body.get("quantity");
		if (name == null || quantity == null)
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		
		try {
			ingredientsRepo.addRecipeIngredient(recipeID, name, Float.valueOf(quantity));
			HttpHeaders headers = new HttpHeaders();
			headers.add("Location",String.join("/api/recipes/%s/%s", recipeID, name));
	        return new ResponseEntity<>(headers, HttpStatus.CREATED);
		} catch(Exception exception) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
}