package unimib.ingsof.model;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipeIngredientRepository extends CrudRepository<RecipeIngredient, String> {
    @Query(value = "SELECT RI.* FROM recipe_ingredient AS RI JOIN recipe AS R WHERE RI.recipeID = R.recipeID AND RI.recipeID = :recipeID", nativeQuery = true)
    ArrayList<RecipeIngredient> getAll(@Param("recipeID") String recipeID);
    
    @Modifying
    @Query("INSERT INTO RecipeIngredient (recipeID, ingredientID, quantity) values (:recipeID, :ingredientID, :quantity)")
    void addIngredient(@Param("recipeID") String recipeID, @Param("ingredientID") String ingredientID, @Param("quantity") float quantity);
}