package unimib.ingsof;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import unimib.ingsof.model.RecipeIngredientRepository;
import unimib.ingsof.model.RecipeRepository;

@Service
public class Initializr {
	@Autowired
	private RecipeRepository recipesRepo;
	@Autowired
	private RecipeIngredientRepository ingredientsRepo;

    @PostConstruct
    public void init(){
        recipesRepo.rebase();
        ingredientsRepo.rebase();
    }
}