package unimib.ingsof.api;

import static org.junit.Assert.assertTrue;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Map;
import java.util.Optional;
import java.util.TreeMap;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import unimib.ingsof.logic.ResetController;

@SpringBootTest
class BeerListEndpointTest {
	@Autowired
	private BeerListEndpoint beerListEndpoint;
	@Autowired
	private RecipeListEndpoint recipeListEndpoint;
	@Autowired
	private InventoryEndpoint inventoryEndpoint;
	@Autowired
	private RecipeEndpoint recipeEndpoint;
	@Autowired
	ResetController resetController;
	
	@Test
	void testBehavior() {
		resetController.doAssure();
		int oldnum = beerListEndpoint.getBeerIDs(Optional.empty(), Optional.empty()).getBody().size();
		
		Map<String, String> recipeBody = new TreeMap<String, String>();
		recipeBody.put("name", "ricetta");
		String recipeID = recipeListEndpoint.postRecipe(recipeBody).getHeaders().getFirst("recipeID");
		Map<String, String> ingredientBody = new TreeMap<String, String>();
		ingredientBody.put("name", "ingrediente");
		ingredientBody.put("quantity", "7");
		recipeEndpoint.postRecipeIngredient(recipeID, ingredientBody);
		inventoryEndpoint.postIngredient(ingredientBody);	
		Map<String, String> beerBody = new TreeMap<String, String>();
		beerBody.put("name", "BeerListControllerTest");
		assertTrue(beerListEndpoint.postBeer(beerBody).getStatusCode().is4xxClientError());
		beerBody.put("recipeID", recipeID);
		assertTrue(beerListEndpoint.postBeer(beerBody).getStatusCode().is2xxSuccessful());
		assertEquals(oldnum + 1, beerListEndpoint.getBeerIDs(Optional.empty(), Optional.empty()).getBody().size());
		
		assertTrue(beerListEndpoint.postBeer(beerBody).getStatusCode().is4xxClientError());
		resetController.doDrop();

	}
	
	@Test
	void testAlternative() {
		resetController.doAssure();
		assertTrue(beerListEndpoint.getBeerIDs(Optional.of("name"), Optional.of("recipeID")).getStatusCode().is2xxSuccessful());
		resetController.doDrop();
	}
	
	@Test
	void allGoesWrong() {
		resetController.doAssure();
		
		Map<String, String> beerBody = null;
		assertTrue(beerListEndpoint.postBeer(beerBody).getStatusCode().is4xxClientError());
		
		beerBody = new TreeMap<>();
		assertTrue(beerListEndpoint.postBeer(beerBody).getStatusCode().is4xxClientError());
		
		beerBody = new TreeMap<>();
		beerBody.put("name", "BeerListControllerTest");
		beerBody.put("recipeID", "id");
		assertTrue(beerListEndpoint.postBeer(beerBody).getStatusCode().is4xxClientError());
		
		resetController.doDrop();
	}
}