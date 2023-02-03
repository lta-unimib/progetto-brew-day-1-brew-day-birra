package unimib.ingsof.logic;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import unimib.ingsof.exceptions.DoesntExistsException;
import unimib.ingsof.exceptions.ValidationException;
import unimib.ingsof.persistence.model.Setting;
import unimib.ingsof.persistence.repository.SettingRepository;
import unimib.ingsof.validation.validators.SettingUpdatingValidator;

@Service
public class SettingController {
	@Autowired
	private SettingRepository settingRepository;
	
	public Setting getSetting(String settingID) throws DoesntExistsException {
		Setting setting = settingRepository.getSetting(settingID);
		if (setting == null)
			throw new DoesntExistsException();
		return setting;
	}

	public Setting updateSetting(String settingID, Map<String, String> settingObject) throws ValidationException, DoesntExistsException {
		settingObject = SettingUpdatingValidator.getInstance().handle(settingObject);
		Setting setting = settingRepository.getSetting(settingID);
		if (setting == null)
			throw new DoesntExistsException();
		
		String value = settingObject.get("value");
		settingRepository.updateSetting(settingID, value);
		return new Setting(settingID, value);
	}

	public void deleteSetting(String settingID) {
		settingRepository.deleteSetting(settingID);
	}
}