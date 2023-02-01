package unimib.ingsof.logic;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import unimib.ingsof.exceptions.WrongBodyException;
import unimib.ingsof.persistence.repository.BeerRepository;

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
		return beerRepository.getAllBeerIDsFiltered(filterByName.get(), filterByRecipeID.get());
	}
	
	public String addBeer(Map<String, String> beerObject) throws WrongBodyException {
		if (beerObject == null || beerObject.get("name") == null || beerObject.get("recipeID") == null)
            throw new WrongBodyException();
		String name = beerObject.get("name");
		String beerID = name;
		String recipeID = beerObject.get("recipeID");
		beerRepository.addBeer(beerID, name, recipeID);
		return beerID;
	}
}