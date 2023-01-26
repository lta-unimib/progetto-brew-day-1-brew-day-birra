package unimib.ingsof;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import unimib.ingsof.model.RecipeIngredientRepository;
import unimib.ingsof.model.RecipeRepository;
import unimib.ingsof.model.IngredientRepository;
import unimib.ingsof.model.InventoryIngredientRepository;

@Service
public class Initializr {
	@Autowired
	private RecipeRepository recipesRepo;
	@Autowired
	private RecipeIngredientRepository recIngredientsRepo;
    @Autowired
	private InventoryIngredientRepository invIngredientsRepo;
    @Autowired
	private IngredientRepository ingredientsRepo;
	
	@PostConstruct 
	public void init() {
		ingredientsRepo.assure();
		invIngredientsRepo.assure();
		recipesRepo.assure();
		recIngredientsRepo.assure();
	}
	
}