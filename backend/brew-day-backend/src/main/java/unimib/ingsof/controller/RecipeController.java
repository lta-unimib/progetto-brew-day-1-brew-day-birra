package unimib.ingsof.controller;

import java.util.Map;
import java.util.TreeMap;

import org.springframework.beans.factory.annotation.Autowired;
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
		Map<String, Object> response = new TreeMap<String, Object>();
		response.put("recipeID", recipeID);
		response.put("name", recipesRepo.getNameByID(recipeID));
		response.put("ingredients", ingredientsRepo.getAll(recipeID));
		return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
	@PutMapping
	public ResponseEntity<Object> updateRecipe(@PathVariable String recipeID,
												@RequestBody Map<String, String> body) {
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@DeleteMapping
	public ResponseEntity<Object> deleteRecipe(@PathVariable String recipeID) {
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@PostMapping
	public ResponseEntity<Object> postRecipeIngredient(@PathVariable String recipeID,
														@RequestBody Map<String, String> body) {
		return new ResponseEntity<>(HttpStatus.OK);
	}
}