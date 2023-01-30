package unimib.ingsof.api;

import java.util.ArrayList;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import unimib.ingsof.persistence.repository.RecipeRepository;

@RestController
@RequestMapping("/api/recipes")
public class RecipeListEndpoint {
	@Autowired
	private RecipeRepository recipeRepository;
	
	@GetMapping
	public ResponseEntity<ArrayList<String>> getRecipeIDs(@RequestParam Optional<String> nameFilter) {
		String name = nameFilter.orElse(null);
		if (name != null)
			return new ResponseEntity<>(recipeRepository.getIDByName(name), HttpStatus.OK);
		return new ResponseEntity<>(recipeRepository.getAllRecipeIDs(), HttpStatus.OK);
	}
	
	@PostMapping
	public ResponseEntity<Object> postRecipe(@RequestBody Map<String, String> body) {
		if (body == null || body.get("name") == null)
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		try {
			String recipeID = body.get("name");
			String name = recipeID;
			recipeRepository.addRecipe(recipeID, name);
			HttpHeaders headers = new HttpHeaders();
			headers.add("Location",String.join("/api/recipes/%s", body.get("name")));
	        return new ResponseEntity<>(headers, HttpStatus.CREATED);
		} catch(Exception exception) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
}