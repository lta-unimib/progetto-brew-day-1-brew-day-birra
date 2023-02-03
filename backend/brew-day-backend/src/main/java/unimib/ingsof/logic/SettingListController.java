package unimib.ingsof.logic;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import unimib.ingsof.exceptions.AlreadyExistsException;
import unimib.ingsof.exceptions.ValidationException;
import unimib.ingsof.persistence.model.Setting;
import unimib.ingsof.persistence.repository.SettingRepository;
import unimib.ingsof.validation.validators.SettingInitializationValidator;

@Service
public class SettingListController {
	@Autowired
	private SettingRepository settingRepository;
	
	public List<Setting> getSettings() {
		return settingRepository.getAll();
	}
	
	public String addSetting(Map<String, String> settingObject) throws ValidationException, AlreadyExistsException {
		settingObject = SettingInitializationValidator.getInstance().handle(settingObject);
		String settingID = settingObject.get("settingID");
		String value = settingObject.get("value");
		
		Setting setting = settingRepository.getSetting(settingID);
		if (setting != null)
			throw new AlreadyExistsException();
		
		settingRepository.addSetting(settingID, value);
		return settingID;
	}
}