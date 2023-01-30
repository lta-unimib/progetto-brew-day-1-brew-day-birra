package unimib.ingsof.api;

import java.util.ArrayList;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import unimib.ingsof.persistence.model.IngredientInstance;
import unimib.ingsof.persistence.model.RecipeIngredient;
import unimib.ingsof.persistence.repository.RecipeIngredientRepository;

@RestController
@RequestMapping("/api/recipes/{recipeID}/{ingredientID}")
public class RecipeIngredientEndpoint {
	@Autowired
	private RecipeIngredientRepository recipeIngredientRepository;
	
	@GetMapping
	public ResponseEntity<IngredientInstance> getRecipeIngredientByID(@PathVariable String recipeID,
															@PathVariable String ingredientID) {
		IngredientInstance ingredient = recipeIngredientRepository.getRecipeIngredient(recipeID, ingredientID);
		if (ingredient == null)
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		return new ResponseEntity<>(ingredient, HttpStatus.OK);
	}
	
	@PutMapping
	public ResponseEntity<RecipeIngredient> updateRecipeIngredient(@PathVariable String recipeID,
															@PathVariable String ingredientID,
															@RequestBody Map<String, String> body) {
		if (body == null)
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		String quantity = body.get("quantity");
		if (quantity != null) {
			try {
				ArrayList<RecipeIngredient> result = recipeIngredientRepository.updateRecipeIngredientQuantity(recipeID, ingredientID, Float.valueOf(quantity));
				if (result.isEmpty())
					return new ResponseEntity<>(HttpStatus.NOT_FOUND);
				return new ResponseEntity<>(result.get(0), HttpStatus.OK);
			} catch(Exception exception) {
				return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			}
		}
		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}
	
	@DeleteMapping
	public ResponseEntity<Object> deleteRecipeIngredient(@PathVariable String recipeID,
															@PathVariable String ingredientID) {
		recipeIngredientRepository.removeRecipeIngredient(recipeID, ingredientID);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}