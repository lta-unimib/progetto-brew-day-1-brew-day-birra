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
import unimib.ingsof.persistence.model.InventoryIngredient;
import unimib.ingsof.persistence.repository.InventoryIngredientRepository;

@RestController
@RequestMapping("/api/inventory/{ingredientID}")
public class InventoryIngredientEndpoint {
	
	@Autowired
	private InventoryIngredientRepository inventoryIngredientRepository;
	
	@GetMapping
	public ResponseEntity<IngredientInstance> getIngredientByID(@PathVariable String ingredientID) {
		if (ingredientID == null) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	    }
		IngredientInstance result = inventoryIngredientRepository.getIngredientById(ingredientID);		
		if (result==null)
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		return new ResponseEntity<>(result, HttpStatus.OK);
	}
	
	@PutMapping
	public ResponseEntity<Object> updateIngredient(@PathVariable String ingredientID,
												@RequestBody Map<String, String> body) {
		if (ingredientID == null || body.get("quantity") == null) {
	        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	    }
		ArrayList<InventoryIngredient> result;        
        try {
        	result = inventoryIngredientRepository.updateIngredient(ingredientID, 
            		Float.parseFloat(body.get("quantity")));
            
	    } catch (Exception e) {
	    	return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	    }
        if (result.isEmpty())
        	return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        
        return new ResponseEntity<>(result, HttpStatus.OK);
	}
	
	
	@DeleteMapping
	public ResponseEntity<Object> deleteIngredient(@PathVariable String ingredientID) {
		if (ingredientID == null) {
	        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	    }  
        inventoryIngredientRepository.deleteIngredient(ingredientID);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}