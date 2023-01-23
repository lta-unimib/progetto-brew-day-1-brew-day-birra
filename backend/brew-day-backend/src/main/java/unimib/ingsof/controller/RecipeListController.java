package unimib.ingsof.controller;

import java.util.ArrayList;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import unimib.ingsof.model.RecipeRepository;

@RestController
@RequestMapping("/api/recipes")
public class RecipeListController {
	@Autowired
	private RecipeRepository recipesRepo;
	
	@GetMapping
	public ResponseEntity<ArrayList<String>> getRecipeIDs(@RequestParam String name) {
		if (name != null)
			return new ResponseEntity<>(recipesRepo.getIDByName(name), HttpStatus.OK);
		return new ResponseEntity<>(recipesRepo.getAllRecipeIDs(), HttpStatus.OK);
	}
	
	@PostMapping
	@Transactional
	public ResponseEntity<Object> postRecipe(@RequestBody Map<String, String> body) {
		if (body == null || body.get("name") == null)
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		try {
			String recipeID = body.get("name");
			String name = recipeID;
			recipesRepo.addRecipe(recipeID, name);
			HttpHeaders headers = new HttpHeaders();
			headers.add("Location",String.join("/api/recipes/%s", body.get("name")));
	        return new ResponseEntity<>(headers, HttpStatus.CREATED);
		} catch(Exception exception) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
}