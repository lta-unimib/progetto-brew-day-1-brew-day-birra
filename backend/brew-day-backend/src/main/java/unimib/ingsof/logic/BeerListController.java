package unimib.ingsof.logic;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import unimib.ingsof.exceptions.InsufficientEquipmentException;
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
	@Autowired
	private SettingController settingController;
	
	public List<String> getAllBeerIDs(Optional<String> filterByName, Optional<String> filterByRecipeID) {
		return beerRepository.getAllBeerIDs(filterByName.orElse(""), filterByRecipeID.orElse(""));
	}
	
	public String addBeer(Map<String, String> beerObject) throws Exception {
		beerObject = BeerInitializationValidator.getInstance().handle(beerObject);
		String name = beerObject.get(Protocol.NAME_KEY);
		String recipeID = beerObject.get(Protocol.RECIPE_ID_KEY);
		float quantity = Float.parseFloat(beerObject.get(Protocol.QUANTITY_KEY));
		recipeController.getRecipeByID(recipeID);
		float equipment = 0;
		try {
			equipment = Float.parseFloat(settingController.getEquipment());
		} catch (Exception e) {
			throw new Exception();
		}
		if (quantity > equipment)
			throw new InsufficientEquipmentException();
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