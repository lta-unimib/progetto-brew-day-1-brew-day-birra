package unimib.ingsof.logic;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import unimib.ingsof.exceptions.DoesntExistsException;
import unimib.ingsof.exceptions.NotEnoughIngredientsException;
import unimib.ingsof.exceptions.ValidationException;
import unimib.ingsof.exceptions.WrongIDGenerationInitialization;
import unimib.ingsof.generation.id.IDGenerationFacade;
import unimib.ingsof.persistence.repository.BeerRepository;
import unimib.ingsof.persistence.service.Protocol;
import unimib.ingsof.validation.validators.BeerInitializationValidator;

@Service
public class BeerListController {
	@Autowired
	private BeerRepository beerRepository;
	@Autowired
	private RecipeController recipeController;
	@Autowired
	ExecuteRecipeController executeRecipeController;
	
	public List<String> getAllBeerIDs(Optional<String> filterByName, Optional<String> filterByRecipeID) {
		return beerRepository.getAllBeerIDs(filterByName.orElse(""), filterByRecipeID.orElse(""));
	}
	
	public String addBeer(Map<String, String> beerObject) throws ValidationException, WrongIDGenerationInitialization, DoesntExistsException, NotEnoughIngredientsException {
		beerObject = BeerInitializationValidator.getInstance().handle(beerObject);
		String name = beerObject.get(Protocol.NAME_KEY);
		String recipeID = beerObject.get(Protocol.RECIPE_ID_KEY);
		float quantity = Float.parseFloat(beerObject.get(Protocol.QUANTITY_KEY));
		recipeController.getRecipeByID(recipeID);
		
		executeRecipeController.execute(recipeID, quantity);

		String beerID = "";
		while(true) {
			beerID = IDGenerationFacade.getInstance().generateBeerID(beerObject);
			if (!beerRepository.getAllBeerIDs("", "").contains(beerID))
				break;
		}
		
		beerRepository.addBeer(beerID, name, recipeID);
		return beerID;
	}
}