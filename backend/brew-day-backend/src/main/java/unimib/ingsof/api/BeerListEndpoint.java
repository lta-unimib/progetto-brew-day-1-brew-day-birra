package unimib.ingsof.api;

import java.util.List;
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
import unimib.ingsof.logic.BeerListController;

@RestController
@RequestMapping("/api/beer")
public class BeerListEndpoint {
	@Autowired
	private BeerListController beerListController;
	
	@GetMapping
	public ResponseEntity<List<String>> getBeerIDs(@RequestParam("name") Optional<String> filterByName, @RequestParam("recipeID") Optional<String> filterByRecipeID) {
		return new ResponseEntity<>(beerListController.getAllBeerIDs(filterByName, filterByRecipeID), HttpStatus.OK);
	}
	
	@PostMapping
	public ResponseEntity<Object> postBeer(@RequestBody Map<String, String> beerObject) {
		try {
			String beerID = beerListController.addBeer(beerObject);
			HttpHeaders headers = new HttpHeaders();
			headers.add("beerID", beerID);
			return new ResponseEntity<>(headers, HttpStatus.OK);
		} catch(Exception exception) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
}