package unimib.ingsof.model;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipeIngredientRepository extends CrudRepository<RecipeIngredient, String> {
    @Query("SELECT ingredientID FROM RecipeIngredient WHERE recipeID = :recipeID")
    ArrayList<String> getAll(@Param("recipeID") String recipeID);
    
    @Modifying
    @Query("INSERT INTO RecipeIngredient (recipeID, ingredientID, quantity) values (:recipeID, :ingredientID, :quantity)")
    void addIngredient(@Param("recipeID") String recipeID, @Param("ingredientID") String ingredientID, @Param("quantity") float quantity);
}