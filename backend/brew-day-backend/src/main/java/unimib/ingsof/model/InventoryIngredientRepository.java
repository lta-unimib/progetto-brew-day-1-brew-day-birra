package unimib.ingsof.model;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface InventoryIngredientRepository extends CrudRepository<InventoryIngredient, String>{
	
	@Query(value = "SELECT name, quantity FROM inventory_ingredient LEFT JOIN ingredient ON inventory_ingredient.ingredientID = ingredient.ingredientID ", nativeQuery = true )
	ArrayList<IngredientInstance> getAllIngredients();
	
	@Modifying 
	@Transactional
	@Query("INSERT INTO InventoryIngredient (ingredientID, quantity) VALUES (:ingredientID, :quantity)")
	void addIngredient(@Param("ingredientID") String ingredientID, @Param("quantity") float quantity);
	
	@Modifying 	
	@Transactional
	@Query("DELETE FROM InventoryIngredient WHERE ingredientID=:ingredientID")
	void deleteIngredient(@Param("ingredientID") String ingredientID);
	
	@Modifying 
	@Transactional
	@Query(value = "UPDATE inventory_ingredient SET quantity = :quantity WHERE ingredientID = :ingredientID RETURNING *", nativeQuery = true)
	ArrayList<InventoryIngredient> updateIngredient(@Param("ingredientID") String ingredientID, @Param("quantity") float quantity);
	
	@Query(value = "SELECT name, quantity FROM inventory_ingredient LEFT JOIN ingredient ON inventory_ingredient.ingredientID = ingredient.ingredientID WHERE ingredientID=:ingredientID", nativeQuery = true )
	IngredientInstance getIngredientById(@Param("ingredientID") String ingredientID);
	
	@Modifying 
	@Transactional
	@Query(value = "CREATE TABLE IF NOT EXISTS inventory_ingredient (ingredientID TEXT NOT NULL PRIMARY KEY, quantity REAL NOT NULL, FOREIGN KEY (ingredientID) REFERENCES ingredient(ingredientID))", nativeQuery=true)
	public void assure();
	
	@Modifying 
	@Transactional
	@Query(value = "DROP TABLE IF EXISTS inventory_ingredient", nativeQuery=true)
	void drop();
}
