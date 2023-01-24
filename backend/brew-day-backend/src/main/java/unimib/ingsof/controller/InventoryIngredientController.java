package unimib.ingsof.controller;

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

import unimib.ingsof.model.InventoryIngredient;
import unimib.ingsof.model.InventoryIngredientRepository;

@RestController
@RequestMapping("/api/inventory/{name}")
public class InventoryIngredientController {
	
	@Autowired
	private InventoryIngredientRepository inventoryRepository;
	
	@GetMapping
	public ResponseEntity<InventoryIngredient> getIngredientByID(@PathVariable String name) {
		if (name == null) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	    }
		InventoryIngredient result;
		try {
			result = inventoryRepository.getIngredientById(name);
	    } catch (IllegalArgumentException e) {
	        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	    }
		
		if (result==null)
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		
		return new ResponseEntity<>(result, HttpStatus.OK);
	}
	
	@PutMapping
	public ResponseEntity<Object> updateIngredient(@PathVariable String name,
												@RequestBody Map<String, String> body) {
		if (name == null || body.get("quantity") == null) {
	        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	    }
		ArrayList<InventoryIngredient> result;
        try {
            result = inventoryRepository.updateIngredient(name, 
            		Float.parseFloat(body.get("quantity")));
	    } catch (IllegalArgumentException e) {
	    	return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	    }
        if (result.isEmpty())
        	return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        
        return new ResponseEntity<>(result, HttpStatus.OK);
	}
	
	
	@DeleteMapping
	public ResponseEntity<Object> deleteIngredient(@PathVariable String name) {
		if (name == null) {
	        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	    }  
        try {
            inventoryRepository.deleteIngredient(name);
        } catch (IllegalArgumentException e) {
        	return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	    }
		return new ResponseEntity<>(HttpStatus.OK);
	}
	

	
	

}