package unimib.ingsof.logic;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import unimib.ingsof.exceptions.ValidationException;
import unimib.ingsof.exceptions.WrongIDGenerationInitialization;
import unimib.ingsof.generation.id.IDGenerationFacade;
import unimib.ingsof.persistence.repository.BeerRepository;
import unimib.ingsof.validation.validators.BeerInitializationValidator;

@Service
public class BeerListController {
	@Autowired
	private BeerRepository beerRepository;
	
	public List<String> getAllBeerIDs() {
		return beerRepository.getAllBeerIDs();
	}
	
	public List<String> getAllBeerIDs(Optional<String> filterByName, Optional<String> filterByRecipeID) {
		if (filterByName.isEmpty() && filterByRecipeID.isEmpty())
			return this.getAllBeerIDs();
		return beerRepository.getAllBeerIDsFiltered(filterByName.orElse(""), filterByRecipeID.orElse(""));
	}
	
	public String addBeer(Map<String, String> beerObject) throws ValidationException, WrongIDGenerationInitialization {
		beerObject = BeerInitializationValidator.getInstance().handle(beerObject);
		String name = beerObject.get("name");
		String recipeID = beerObject.get("recipeID");
		String beerID = IDGenerationFacade.getInstance().generateBeerID(beerObject);
		beerRepository.addBeer(beerID, name, recipeID);
		return beerID;
	}
}