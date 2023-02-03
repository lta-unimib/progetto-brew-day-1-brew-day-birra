package unimib.ingsof.logic;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import unimib.ingsof.persistence.repository.BeerNoteRepository;
import unimib.ingsof.persistence.repository.BeerRepository;
import unimib.ingsof.persistence.repository.IngredientRepository;
import unimib.ingsof.persistence.repository.InventoryIngredientRepository;
import unimib.ingsof.persistence.repository.RecipeIngredientRepository;
import unimib.ingsof.persistence.repository.RecipeRepository;
import unimib.ingsof.persistence.repository.SettingRepository;

@Service
public class ResetController {
	@Autowired
	private RecipeRepository recipeRepository;
	@Autowired
	private RecipeIngredientRepository recipeIngredientRepository;
    @Autowired
	private InventoryIngredientRepository inventoryIngredientRepository;
    @Autowired
	private IngredientRepository ingredientRepository;
    @Autowired
	private BeerRepository beerRepository;
    @Autowired
	private BeerNoteRepository beerNoteRepository;
    @Autowired
    private SettingRepository settingRepository;

	public void doReset() {
		this.doDrop();
		this.doAssure();
	}
	
	private void doDrop() {
		beerNoteRepository.drop();
		beerRepository.drop();
		recipeIngredientRepository.drop();
		recipeRepository.drop();
		inventoryIngredientRepository.drop();
		ingredientRepository.drop();
		settingRepository.drop();
	}
	
	private void doAssure() {
		settingRepository.assure();
		ingredientRepository.assure();
		inventoryIngredientRepository.assure();
		recipeRepository.assure();
		recipeIngredientRepository.assure();
		beerRepository.assure();
		beerNoteRepository.assure();
	}

}
