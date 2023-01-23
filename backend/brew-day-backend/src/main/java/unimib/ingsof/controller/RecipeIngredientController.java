package unimib.ingsof.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/recipes/{recipeID}/{ingredientID}")
public class RecipeIngredientController {
	@GetMapping
	public ResponseEntity<Object> getRecipeIngredientByID(@PathVariable String recipeID,
															@PathVariable String ingredientID) {
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@PutMapping
	public ResponseEntity<Object> updateRecipeIngredient(@PathVariable String recipeID,
															@PathVariable String ingredientID,
															@RequestBody Map<String, String> body) {
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@DeleteMapping
	public ResponseEntity<Object> deleteRecipeIngredient(@PathVariable String recipeID,
															@PathVariable String ingredientID) {
		return new ResponseEntity<>(HttpStatus.OK);
	}
}