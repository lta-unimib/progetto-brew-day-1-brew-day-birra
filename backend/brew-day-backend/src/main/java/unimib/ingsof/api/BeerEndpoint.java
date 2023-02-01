package unimib.ingsof.api;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import unimib.ingsof.exceptions.DoesntExistsException;
import unimib.ingsof.logic.RecipeController;
import unimib.ingsof.persistence.view.RecipeView;

@RestController
@RequestMapping("/api/beer/{beerID}")
public class BeerEndpoint {
	@Autowired
	private BeerController beerController;
	
	@GetMapping
	public ResponseEntity<BeerView> getBeerByID(@PathVariable String beerID) {
		try {
			BeerView beer = this.beerController.getRecipeByID(beerID);
			return new ResponseEntity<>(beer, HttpStatus.OK);
		} catch(Exception exception) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PutMapping
	public ResponseEntity<BeerView> updateRecipe(@PathVariable String beerID,
												@RequestBody Map<String, String> beerObject) {
		try {
			BeerView beerView = this.beerController.updateBeer(beerID, beerObject);
			return new ResponseEntity<>(beerView, HttpStatus.OK);
		} catch(DoesntExistsException exception) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		} catch(Exception exception) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@DeleteMapping
	public ResponseEntity<Object> deleteBeer(@PathVariable String beerID) {
		this.beerController.deleteBeer(beerID);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@PostMapping
	public ResponseEntity<Object> postBeerNote(@PathVariable String beerID,
														@RequestBody Map<String, String> noteObject) {
		try {
			String noteID = this.beerController.addNote(beerID, noteObject);
			HttpHeaders headers = new HttpHeaders();
			headers.add("noteID", noteID);
	        return new ResponseEntity<>(headers, HttpStatus.CREATED);
		} catch(Exception exception) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
}
