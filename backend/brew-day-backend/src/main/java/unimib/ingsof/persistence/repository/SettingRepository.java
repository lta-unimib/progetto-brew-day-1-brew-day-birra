package unimib.ingsof.persistence.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import unimib.ingsof.persistence.model.Setting;

@Repository
public interface SettingRepository extends CrudRepository<Setting, String> {
    // GET
    @Query(value = "SELECT * FROM setting", nativeQuery = true)
	List<Setting> getAll();
	
    @Query(value = "SELECT * FROM setting WHERE settingID = :settingID", nativeQuery = true)
    Setting getSetting(@Param("settingID") String settingID);
	
	// POST
    @Query("INSERT INTO Setting (settingID, value) VALUES (:settingID, :value)")
    void addSetting(@Param("settingID") String settingID, @Param("value") String value);
    
	// PUT
    @Query(value = "UPDATE setting SET value = :value WHERE settingID = :settingID RETURNING *", nativeQuery = true)
    List<Setting> updateSetting(@Param("settingID") String settingID, @Param("value") String value);
    
    // DELETE
    @Query(value = "DELETE FROM setting WHERE settingID = :settingID", nativeQuery = true)
    Setting deleteSetting(@Param("settingID") String settingID);
	
	// ASSURE
    @Query(value = "create table if not exists setting (settingID TEXT primary key, value TEXT NOT NULL)", nativeQuery = true)
    void assure();
    
	// DROP
    @Query(value = "drop table if exists setting", nativeQuery = true)
    void drop();
}