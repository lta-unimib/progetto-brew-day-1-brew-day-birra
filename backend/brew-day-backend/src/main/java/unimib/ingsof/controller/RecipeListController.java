package unimib.ingsof.controller;

import java.util.ArrayList;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/recipes")
public class RecipeListController {
	public ResponseEntity<ArrayList<String>> getRecipeIDs() {
		return new ResponseEntity<>(new ArrayList<String>(), HttpStatus.OK);
	}
	
	public ResponseEntity<Object> postRecipe(@RequestBody Map<String, String> body) {
		return new ResponseEntity<>(HttpStatus.OK);
	}
}