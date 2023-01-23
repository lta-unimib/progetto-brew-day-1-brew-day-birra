package unimib.ingsof.model;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipeRepository extends CrudRepository<Recipe, String> {
    @Query("SELECT recipeID FROM Recipe")
    ArrayList<String> getAllRecipeIDs();
    
    @Query("SELECT name FROM Recipe WHERE recipeID = :recipeID")
    String getNameByID(@Param("recipeID") String recipeID);
    
    @Query("SELECT recipeID FROM Recipe WHERE name = :name")
    ArrayList<String> getIDByName(@Param("name") String name);
    
    @Modifying
    @Query("INSERT INTO Recipe (recipeID, name) values (:recipeID, :name)")
    void addRecipe(@Param("recipeID") String recipeID, @Param("name") String name);
}