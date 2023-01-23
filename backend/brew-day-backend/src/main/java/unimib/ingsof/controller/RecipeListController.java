package unimib.ingsof.controller;

import java.util.ArrayList;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/recipes")
public class RecipeListController {
	@GetMapping
	public ResponseEntity<ArrayList<String>> getRecipeIDs() {
		return new ResponseEntity<>(new ArrayList<String>(), HttpStatus.OK);
	}
	
	@PostMapping
	public ResponseEntity<Object> postRecipe(@RequestBody Map<String, String> body) {
		return new ResponseEntity<>(HttpStatus.OK);
	}
}