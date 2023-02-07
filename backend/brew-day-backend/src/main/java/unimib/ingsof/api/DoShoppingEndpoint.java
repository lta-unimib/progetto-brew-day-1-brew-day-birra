package unimib.ingsof.api;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import unimib.ingsof.exceptions.ValidationException;
import unimib.ingsof.logic.ShoppingController;

@RestController
@RequestMapping("/api/shopping")
public class DoShoppingEndpoint {
	
	@Autowired
	ShoppingController shoppingController;
	
	@PostMapping
    public ResponseEntity<Object> postShoppingList(@RequestBody List<Map<String, String>> ingredients) {
		try {
			shoppingController.postShoppingList(ingredients);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (ValidationException e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
    }
}
