package unimib.ingsof.controller;

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

import unimib.ingsof.model.Ingredient;
import unimib.ingsof.model.IngredientInstance;
import unimib.ingsof.model.InventoryIngredientRepository;

@RestController
@RequestMapping("/api/inventory")
public class InventoryController {
	
	
	@Autowired
	private InventoryIngredientRepository inventoryRepository;
	
	@Autowired
	IngredientController ingredientController;


	@GetMapping
    public ResponseEntity<ArrayList<IngredientInstance>> getAllIngredients() {
		ArrayList<IngredientInstance> result = inventoryRepository.getAllIngredients();
		return new ResponseEntity<>(result, HttpStatus.OK);
		
    }
	
	@PostMapping 
	public ResponseEntity<Object> postIngredient(@RequestBody Map<String, String> newIngredient) {
        
		if (newIngredient == null ||
            newIngredient.get("name") == null || newIngredient.get("quantity") == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        
        HttpHeaders headers;
        String ingredientID;
        String name = newIngredient.get("name");
        Float quantity = Float.parseFloat(newIngredient.get("quantity"));

        try {
        	
        	Ingredient ingrediente = ingredientController.getIngredientByName(name);
        	
        	if(ingrediente == null) {
        		ingrediente = ingredientController.addIngredient(name);
        		ingredientID = ingrediente.getIngredientID();
        	} else {
        		ingredientID = ingrediente.getIngredientID();
        	}
        	
            inventoryRepository.addIngredient(ingredientID, quantity);
            
			headers = new HttpHeaders();
			headers.add("Location", ingredientID);
            
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        
        return new ResponseEntity<>(headers, HttpStatus.CREATED);
    }

}
