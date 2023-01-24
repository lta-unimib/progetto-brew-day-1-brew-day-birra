package unimib.ingsof.controller;

import java.util.ArrayList;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import unimib.ingsof.model.InventoryIngredient;
import unimib.ingsof.model.InventoryIngredientRepository;

@RestController
@RequestMapping("/api/inventory")
public class InventoryController {
	
	@Autowired
	private InventoryIngredientRepository inventoryRepository;

	@GetMapping
    public ResponseEntity<ArrayList<InventoryIngredient>> getAllIngredients() {
		
		ArrayList<InventoryIngredient> result = inventoryRepository.getAllIngredients();
		
		if (result.isEmpty())
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		
		return new ResponseEntity<>(result, HttpStatus.OK);
		
    }
	
	@PostMapping 
	public ResponseEntity<Object> postIngredient(@RequestBody Map<String, String> newIngredient) {
        if (newIngredient == null ||
            newIngredient.get("name") == null || newIngredient.get("quantity") == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        try {
            inventoryRepository.addIngredient(newIngredient.get("name"), 
                            Float.parseFloat(newIngredient.get("quantity")));
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
