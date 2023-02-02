package unimib.ingsof.api;

import static org.junit.Assert.assertTrue;

import java.util.Map;
import java.util.TreeMap;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import unimib.ingsof.persistence.repository.BeerNoteRepository;
import unimib.ingsof.persistence.repository.BeerRepository;
import unimib.ingsof.persistence.repository.RecipeRepository;

@SpringBootTest
class BeerEndpointTest {
	@Autowired
	private BeerListEndpoint beerListEndpoint;
	@Autowired
	private RecipeListEndpoint recipeListEndpoint;
	@Autowired
	private BeerEndpoint beerEndpoint;
	@Autowired
	private BeerRepository beerRepository;
	@Autowired
	private BeerNoteRepository beerNoteRepository;
	@Autowired
	private RecipeRepository recipeRepository;
	

	@Test
	void testBehavior() {
		
		recipeRepository.assure();
		beerRepository.assure();
		beerNoteRepository.assure();
		
		String beerName = "BeerTest";
		String noteType = "generic";
		String description = "Descrizione";
		
		Map<String, String> recipeBody = new TreeMap<String, String>();
		recipeBody.put("name", "ricetta");
		String recipeID = recipeListEndpoint.postRecipe(recipeBody).getHeaders().getFirst("recipeID");
		
		Map<String, String> beerBody = new TreeMap<String, String>();
		beerBody.put("name", beerName);
		beerBody.put("recipeID", recipeID);
		
		String beerID = beerListEndpoint.postBeer(beerBody).getHeaders().getFirst("beerID");
		assertTrue(beerEndpoint.getBeerByID(beerID).getStatusCode().is2xxSuccessful());
		
		beerBody.clear();
		beerBody.put("name", "NewName");
		assertTrue(beerEndpoint.updateBeer(beerID, beerBody).getStatusCode().is2xxSuccessful());

		beerBody.put("name", beerName);
		assertTrue(beerEndpoint.updateBeer(beerID, beerBody).getStatusCode().is2xxSuccessful());

		beerBody.clear();
		beerBody.put("noteType", noteType);
		beerBody.put("description", description);
		assertTrue(beerEndpoint.postBeerNote(beerID, beerBody).getStatusCode().is2xxSuccessful());
		
		assertTrue(beerEndpoint.getBeerByID(beerID).getStatusCode().is2xxSuccessful());

		assertTrue(beerEndpoint.deleteBeer(beerID).getStatusCode().is2xxSuccessful());
		assertTrue(beerEndpoint.getBeerByID(beerID).getStatusCode().is4xxClientError());

		beerNoteRepository.drop();
		beerRepository.drop();

	}
	
	@Test
	void allGoesWrong() {
		recipeRepository.assure();
		beerRepository.assure();
		beerNoteRepository.assure();

		Map<String, String> recipeBody = new TreeMap<String, String>();
		recipeBody.put("name", "ricetta");
		String recipeID = recipeListEndpoint.postRecipe(recipeBody).getHeaders().getFirst("recipeID");
		
		Map<String, String> beerBody = new TreeMap<String, String>();
		String beerName = "beer";
		beerBody.put("name", beerName);
		beerBody.put("recipeID", recipeID);
		String beerID = beerListEndpoint.postBeer(beerBody).getHeaders().getFirst("beerID");
		
		beerBody = null;
		assertTrue(beerEndpoint.updateBeer(beerID, beerBody).getStatusCode().is4xxClientError());
		
		beerBody = new TreeMap<>();
		assertTrue(beerEndpoint.updateBeer(beerID, beerBody).getStatusCode().is4xxClientError());

		assertTrue(beerEndpoint.updateBeer(beerID, beerBody).getStatusCode().is4xxClientError());
		
		beerBody.put("name", beerName);
		assertTrue(beerEndpoint.updateBeer(beerID, beerBody).getStatusCode().is4xxClientError());
		
		Map<String, String> noteBody = null;
		assertTrue(beerEndpoint.postBeerNote(beerID, noteBody).getStatusCode().is4xxClientError());
		
		noteBody = new TreeMap<>();
		assertTrue(beerEndpoint.postBeerNote(beerID, noteBody).getStatusCode().is4xxClientError());

		noteBody.put("noteType", "tipo");
		assertTrue(beerEndpoint.postBeerNote(beerID, noteBody).getStatusCode().is4xxClientError());
		
		beerNoteRepository.drop();
		beerRepository.drop();
		recipeRepository.drop();
	}
}