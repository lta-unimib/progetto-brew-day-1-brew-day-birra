package unimib.ingsof.api;

import static org.junit.Assert.assertTrue;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Map;
import java.util.Optional;
import java.util.TreeMap;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import unimib.ingsof.persistence.repository.BeerRepository;
import unimib.ingsof.persistence.repository.RecipeRepository;

@SpringBootTest
class BeerListEndpointTest {
	@Autowired
	private BeerListEndpoint beerListEndpoint;
	@Autowired
	private RecipeListEndpoint recipeListEndpoint;
	@Autowired
	private RecipeRepository recipeRepository;
	@Autowired
	private BeerRepository beerRepository;	
	
	@Test
	void testBehavior() {
		recipeRepository.assure();
		beerRepository.assure();
		
		int oldnum = beerListEndpoint.getBeerIDs(Optional.empty(), Optional.empty()).getBody().size();
		
		Map<String, String> recipeBody = new TreeMap<String, String>();
		recipeBody.put("name", "ricetta");
		String recipeID = recipeListEndpoint.postRecipe(recipeBody).getHeaders().getFirst("recipeID");
		
		
		Map<String, String> beerBody = new TreeMap<String, String>();
		beerBody.put("name", "BeerListControllerTest");
		beerBody.put("recipeID", recipeID);
		assertTrue(beerListEndpoint.postBeer(beerBody).getStatusCode().is2xxSuccessful());
		assertEquals(oldnum + 1, beerListEndpoint.getBeerIDs(Optional.empty(), Optional.empty()).getBody().size());
		
		beerRepository.drop();
		recipeRepository.drop();
	}
	
	@Test
	void testAlternative() {
		recipeRepository.assure();
		beerRepository.assure();
		assertTrue(beerListEndpoint.getBeerIDs(Optional.of("name"), Optional.of("recipeID")).getStatusCode().is2xxSuccessful());
		beerRepository.drop();
		recipeRepository.drop();
	}
	
	@Test
	void allGoesWrong() {
		recipeRepository.assure();
		beerRepository.assure();
		
		Map<String, String> beerBody = null;
		assertTrue(beerListEndpoint.postBeer(beerBody).getStatusCode().is4xxClientError());
		
		beerBody = new TreeMap<>();
		assertTrue(beerListEndpoint.postBeer(beerBody).getStatusCode().is4xxClientError());
		
		beerBody = new TreeMap<>();
		beerBody.put("name", "BeerListControllerTest");
		beerBody.put("recipeID", "id");
		assertTrue(beerListEndpoint.postBeer(beerBody).getStatusCode().is4xxClientError());
		
		beerRepository.drop();
		recipeRepository.drop();
	}
}