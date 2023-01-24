package unimib.ingsof.model;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface RecipeRepository extends CrudRepository<Recipe, String> {
    // GET
    @Query("SELECT recipeID FROM Recipe")
    ArrayList<String> getAllRecipeIDs();
    
    // GET
    @Query("SELECT name FROM Recipe WHERE recipeID = :recipeID")
    String getNameByID(@Param("recipeID") String recipeID);
    
    // GET
    @Query("SELECT recipeID FROM Recipe WHERE name = :name")
    ArrayList<String> getIDByName(@Param("name") String name);
    
    // POST
    @Modifying
    @Query("INSERT INTO Recipe (recipeID, name) values (:recipeID, :name)")
    @Transactional
    void addRecipe(@Param("recipeID") String recipeID, @Param("name") String name);

    // DELETE
    @Modifying
    @Query("DELETE FROM Recipe WHERE recipeID = :recipeID")
    @Transactional
    void removeRecipe(@Param("recipeID") String recipeID);

    // PUT
    @Modifying
    @Query(value = "UPDATE recipe SET name = :name WHERE recipeID = :recipeID RETURNING *", nativeQuery = true)
    @Transactional
	ArrayList<Recipe> updateRecipeName(@Param("recipeID") String recipeID, @Param("name") String name);

    // ASSURE
    @Modifying
    @Query(value = "create table if not exists recipe (recipeID TEXT primary key, name TEXT NOT NULL)", nativeQuery = true)
    @Transactional
	void assure();

    // REBASE
    @Modifying
    @Query(value = "drop table if exists recipe", nativeQuery = true)
    @Transactional
	void drop();
}