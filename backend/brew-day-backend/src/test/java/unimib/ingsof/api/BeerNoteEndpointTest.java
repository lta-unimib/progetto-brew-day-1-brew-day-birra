package unimib.ingsof.api;

import static org.junit.Assert.assertTrue;
import static org.junit.Assert.assertEquals;

import java.util.Map;
import java.util.TreeMap;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import unimib.ingsof.persistence.repository.BeerNoteRepository;
import unimib.ingsof.persistence.repository.BeerRepository;
import unimib.ingsof.persistence.repository.RecipeRepository;

@SpringBootTest
class BeerNoteEndpointTest {
	@Autowired
	private RecipeListEndpoint recipeListEndpoint;
	@Autowired
	private BeerListEndpoint beerListEndpoint;
	@Autowired
	private BeerEndpoint beerEndpoint;
	@Autowired
	private BeerNoteEndpoint beerNoteEndpoint;
	@Autowired
	private RecipeRepository recipeRepository;
	@Autowired
	private BeerNoteRepository beerNoteRepository;
	@Autowired
	private BeerRepository beerRepository;

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
		
		//assertTrue(beerNoteEndpoint.getBeerNoteByID(beerID, noteID).getStatusCode().is4xxClientError());
		
		Map<String, String> noteBody = new TreeMap<String, String>();
		noteBody.put("noteType", noteType);
		noteBody.put("description", description);
		String noteID = beerEndpoint.postBeerNote(beerID, noteBody).getHeaders().getFirst("noteID");
		
		assertTrue(beerNoteEndpoint.getBeerNoteByID(beerID, noteID).getStatusCode().is2xxSuccessful());
		
		noteBody.clear();
		noteBody.put("noteType", "taste");
		noteBody.put("description", "newDescription");
		assertTrue(beerNoteEndpoint.updateBeerNote(beerID, noteID, noteBody).getStatusCode().is2xxSuccessful());
		assertEquals("taste", beerNoteEndpoint.getBeerNoteByID(beerID, noteID).getBody().getNoteType());
		assertEquals("newDescription", beerNoteEndpoint.getBeerNoteByID(beerID, noteID).getBody().getDescription());

		assertTrue(beerNoteEndpoint.deleteBeerNote(beerID, noteID).getStatusCode().is2xxSuccessful());
		assertTrue(beerNoteEndpoint.getBeerNoteByID(beerID, noteID).getStatusCode().is4xxClientError());

		beerNoteRepository.drop();
		beerRepository.drop();
		recipeRepository.drop();
	}
	
	@Test
	void allGoesWrong() {
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
		
		Map<String, String> noteBody = new TreeMap<String, String>();
		noteBody.put("noteType", noteType);
		noteBody.put("description", description);
		String noteID = beerEndpoint.postBeerNote(beerID, noteBody).getHeaders().getFirst("noteID");
		
		assertTrue(beerNoteEndpoint.updateBeerNote("id", noteID, noteBody).getStatusCode().is4xxClientError());

		noteBody = null;
		assertTrue(beerNoteEndpoint.updateBeerNote(beerID, noteID, noteBody).getStatusCode().is4xxClientError());
		
		noteBody = new TreeMap<>();
		assertTrue(beerNoteEndpoint.updateBeerNote(beerID, noteID, noteBody).getStatusCode().is4xxClientError());
		
		noteBody.put("noteType", "tipo");
		assertTrue(beerNoteEndpoint.updateBeerNote(beerID, noteID, noteBody).getStatusCode().is4xxClientError());
		
		beerNoteRepository.drop();
		beerRepository.drop();
		recipeRepository.drop();
	}
}
