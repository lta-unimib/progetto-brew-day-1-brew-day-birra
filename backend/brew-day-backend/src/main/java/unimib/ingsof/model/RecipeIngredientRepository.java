package unimib.ingsof.model;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface RecipeIngredientRepository extends CrudRepository<RecipeIngredient, String> {
    @Query(value = "SELECT RI.* FROM recipe_ingredient AS RI JOIN recipe AS R WHERE RI.recipeID = R.recipeID AND RI.recipeID = :recipeID", nativeQuery = true)
    ArrayList<RecipeIngredient> getAll(@Param("recipeID") String recipeID);
    
    @Modifying
    @Transactional
    @Query("INSERT INTO RecipeIngredient (recipeID, ingredientID, quantity) values (:recipeID, :ingredientID, :quantity)")
    void addRecipeIngredient(@Param("recipeID") String recipeID, @Param("ingredientID") String ingredientID, @Param("quantity") float quantity);

    // ASSURE
    @Modifying
    @Transactional
    @Query(value = "create table if not exists recipe_ingredient (ingredientID TEXT NOT NULL, recipeID TEXT NOT NULL, quantity REAL NOT NULL, FOREIGN KEY (recipeID) REFERENCES recipe(recipeID) ON DELETE CASCADE, PRIMARY KEY (recipeID, ingredientID));", nativeQuery = true)
	void assure();

    // REBASE
    @Modifying
    @Transactional
    @Query(value = "drop table if exists recipe_ingredient; create table if not exists recipe_ingredient (ingredientID TEXT NOT NULL, recipeID TEXT NOT NULL, quantity REAL NOT NULL, FOREIGN KEY (recipeID) REFERENCES recipe(recipeID) ON DELETE CASCADE, PRIMARY KEY (recipeID, ingredientID));", nativeQuery = true)
	void rebase();
}