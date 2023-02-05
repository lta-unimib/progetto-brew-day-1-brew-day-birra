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
import unimib.ingsof.validation.validators.BeerInitializationValidator;

@Service
public class BeerListController {
	@Autowired
	private BeerRepository beerRepository;
	@Autowired
	private RecipeController recipeController;
	@Autowired
	ExecuteRecipeController executeRecipeController;
	@Autowired
	private BeerController beerController;
	
	public List<String> getAllBeerIDs(Optional<String> filterByName, Optional<String> filterByRecipeID) {
		return beerRepository.getAllBeerIDs(filterByName.orElse(""), filterByRecipeID.orElse(""));
	}
	
	public String addBeer(Map<String, String> beerObject) throws ValidationException, WrongIDGenerationInitialization, DoesntExistsException, NotEnoughIngredientsException {
		beerObject = BeerInitializationValidator.getInstance().handle(beerObject);
		String name = beerObject.get("name");
		String recipeID = beerObject.get("recipeID");
		recipeController.getRecipeByID(recipeID);
		
		executeRecipeController.execute(recipeID);

		String beerID = "";
		try {
			beerID = IDGenerationFacade.getInstance().generateBeerID(beerObject);
			beerController.getBeerDetailsByID(beerID);
		} catch(DoesntExistsException exception) {
			
		}
		beerRepository.addBeer(beerID, name, recipeID);
		return beerID;
	}
}