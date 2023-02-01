package unimib.ingsof.api;

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

import unimib.ingsof.exceptions.DoesntExistsException;
import unimib.ingsof.logic.BeerNoteController;
import unimib.ingsof.persistence.view.BeerNoteView;

@RestController
@RequestMapping("/api/beer/{beerID}/{noteID}")
public class BeerNoteEndpoint {
	@Autowired
	private BeerNoteController beerNoteController;
	
	@GetMapping
	public ResponseEntity<BeerNoteView> getBeerNoteByID(@PathVariable String beerID,
															@PathVariable String noteID) {
		try {
			BeerNoteView beerNoteView = this.beerNoteController.getNote(beerID, noteID);
			return new ResponseEntity<>(beerNoteView, HttpStatus.OK);
		} catch(Exception exception) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PutMapping
	public ResponseEntity<BeerNoteView> updateBeerNote(@PathVariable String beerID,
															@PathVariable String noteID,
															@RequestBody Map<String, String> noteObject) {
		try {
			BeerNoteView beerNoteView = this.beerNoteController.updateNote(beerID, noteID, noteObject);
			return new ResponseEntity<>(beerNoteView, HttpStatus.OK);
		} catch(DoesntExistsException exception) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		} catch(Exception exception) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@DeleteMapping
	public ResponseEntity<Object> deleteBeerNote(@PathVariable String beerID,
															@PathVariable String noteID) {
		beerNoteController.deleteNote(beerID, noteID);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}