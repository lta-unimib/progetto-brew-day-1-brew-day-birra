package unimib.ingsof;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import unimib.ingsof.model.RecipeIngredientRepository;
import unimib.ingsof.model.RecipeRepository;
import unimib.ingsof.model.InventoryIngredientRepository;

@Service
public class Initializr {
	@Autowired
	private RecipeRepository recipesRepo;
	@Autowired
	private RecipeIngredientRepository ingredientsRepo;
  @Autowired
	private InventoryIngredientRepository invIngredientsRepo;
	
	@PostConstruct 
	public void init() {
		invIngredientsRepo.assure();
    recipesRepo.assure();
    ingredientsRepo.assure();
	}
	
}