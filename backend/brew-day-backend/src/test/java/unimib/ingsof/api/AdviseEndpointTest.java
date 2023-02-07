package unimib.ingsof.api;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.util.Map;
import java.util.TreeMap;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import unimib.ingsof.logic.ResetController;
import unimib.ingsof.persistence.service.Protocol;

@SpringBootTest
class AdviseEndpointTest {
	@Autowired
	private RecipeListEndpoint recipeListEndpoint;
	@Autowired
	private RecipeEndpoint recipeEndpoint;
	@Autowired
	private InventoryEndpoint inventoryEndpoint;	
	@Autowired
	private AdviseEndpoint recipeAdviseEndpoint;
	@Autowired
	ResetController resetController;
	
	@Test
	void testBehavior() {
		resetController.doAssure();
		
		Map<String, String> recipeBody = new TreeMap<>();
		recipeBody.put(Protocol.NAME_KEY, "ricetta");
		String recipeID = recipeListEndpoint.postRecipe(recipeBody).getHeaders().getFirst("recipeID");
		
		Map<String, String> ingredientBody = new TreeMap<>();
		ingredientBody.put(Protocol.NAME_KEY, "ingrediente");
		ingredientBody.put(Protocol.QUANTITY_KEY, "8");
		recipeEndpoint.postRecipeIngredient(recipeID, ingredientBody);
		inventoryEndpoint.postIngredient(ingredientBody);
		
		assertEquals(recipeID, recipeAdviseEndpoint.getRecipeAdvice().getBody().getRecipeID());
		assertEquals(1, recipeAdviseEndpoint.getRecipeAdvice().getBody().getQuantity(), 0.1);

		recipeBody.clear();
		recipeBody.put(Protocol.NAME_KEY, "ricetta_2");
		String recipeID_2 = recipeListEndpoint.postRecipe(recipeBody).getHeaders().getFirst("recipeID");
		
		ingredientBody.clear();
		ingredientBody.put(Protocol.NAME_KEY, "ingrediente");
		ingredientBody.put(Protocol.QUANTITY_KEY, "4");
		recipeEndpoint.postRecipeIngredient(recipeID_2, ingredientBody);
		
		assertEquals(recipeID_2, recipeAdviseEndpoint.getRecipeAdvice().getBody().getRecipeID());
		assertEquals(2, recipeAdviseEndpoint.getRecipeAdvice().getBody().getQuantity(), 0.1);
		
		recipeBody.clear();
		recipeBody.put(Protocol.NAME_KEY, "ricetta_2");
		String recipeID_3 = recipeListEndpoint.postRecipe(recipeBody).getHeaders().getFirst("recipeID");
		
		ingredientBody.clear();
		ingredientBody.put(Protocol.NAME_KEY, "ingrediente");
		ingredientBody.put(Protocol.QUANTITY_KEY, "1");
		recipeEndpoint.postRecipeIngredient(recipeID_3, ingredientBody);
		
		ingredientBody.clear();
		ingredientBody.put(Protocol.NAME_KEY, "ingrediente_2");
		ingredientBody.put(Protocol.QUANTITY_KEY, "1");
		recipeEndpoint.postRecipeIngredient(recipeID_3, ingredientBody);
		
		assertEquals(recipeID_3, recipeAdviseEndpoint.getRecipeAdvice().getBody().getRecipeID());
		assertEquals(4, recipeAdviseEndpoint.getRecipeAdvice().getBody().getQuantity(), 0.1);
		
		
		resetController.doDrop();
	}
	
	
	@Test
	void allGoesWrong() {
		resetController.doAssure();
		
		assertTrue(recipeAdviseEndpoint.getRecipeAdvice().getStatusCode().is4xxClientError());

		resetController.doDrop();
	}
}