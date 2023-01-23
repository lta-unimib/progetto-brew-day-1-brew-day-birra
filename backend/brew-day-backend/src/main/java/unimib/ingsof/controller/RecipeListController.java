package unimib.ingsof.controller;

import java.util.ArrayList;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import unimib.ingsof.model.RecipeIngredientRepository;

@RestController
@RequestMapping("/api/recipes")
public class RecipeListController {
	@Autowired
	private RecipeIngredientRepository recipesRepo;
	
	@GetMapping
	public ResponseEntity<ArrayList<String>> getRecipeIDs() {
		return new ResponseEntity<>(recipesRepo.getAll("ciao"), HttpStatus.OK);
	}
	
	@PostMapping
	@Transactional
	public ResponseEntity<Object> postRecipe(@RequestBody Map<String, String> body) {
		recipesRepo.addIngredient("ciao", "mondo", 5);
		recipesRepo.addIngredient("ciao", "universo", 8);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}