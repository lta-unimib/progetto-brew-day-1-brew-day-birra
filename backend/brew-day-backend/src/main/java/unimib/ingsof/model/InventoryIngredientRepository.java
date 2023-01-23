package unimib.ingsof.model;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface InventoryIngredientRepository extends CrudRepository<InventoryIngredient, String>{
	
	@Query(value = "SELECT * FROM inventory_ingredient", nativeQuery = true )
	ArrayList<InventoryIngredient> getAllIngredients();
	
	
	@Modifying 
	@Query("INSERT INTO inventory_ingredient (ingredientId, quantity) value (:ingredientId, :quantity)")
	void addIngredient(@Param("ingredientId") String ingredientId, @Param("quantity") float quantity);
	

}
