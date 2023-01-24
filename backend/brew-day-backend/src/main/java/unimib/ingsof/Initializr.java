package unimib.ingsof;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import unimib.ingsof.model.InventoryIngredientRepository;

@Service
public class Initializr {
	@Autowired
	private InventoryIngredientRepository invIngredientsRepo;
	
	@PostConstruct 
	public void init() {
		invIngredientsRepo.rebase();
	}
	
}
