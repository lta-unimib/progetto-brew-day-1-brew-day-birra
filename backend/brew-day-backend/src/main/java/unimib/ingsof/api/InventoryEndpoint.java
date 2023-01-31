package unimib.ingsof.api;

import java.util.ArrayList;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import unimib.ingsof.logic.InventoryController;
import unimib.ingsof.persistence.model.IngredientInstance;

@RestController
@RequestMapping("/api/inventory")
public class InventoryEndpoint {
	@Autowired
	InventoryController inventoryController;

	@GetMapping
    public ResponseEntity<ArrayList<IngredientInstance>> getAllIngredients() {
		ArrayList<IngredientInstance> result = inventoryController.getAllIngredients();
		return new ResponseEntity<>(result, HttpStatus.OK);
		
    }
	
	@PostMapping 
	public ResponseEntity<Object> postIngredient(@RequestBody Map<String, String> ingredientObject) {
		try {
			String ingredientID = inventoryController.addIngredient(ingredientObject);
			HttpHeaders headers = new HttpHeaders();
			headers.add("Location", ingredientID);
			return new ResponseEntity<>(headers, HttpStatus.CREATED);
		} catch(Exception exception) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
    }
}
