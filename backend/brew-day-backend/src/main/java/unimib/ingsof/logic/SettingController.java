package unimib.ingsof.logic;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import unimib.ingsof.exceptions.DoesntExistsException;
import unimib.ingsof.exceptions.ValidationException;
import unimib.ingsof.persistence.model.Setting;
import unimib.ingsof.persistence.repository.SettingRepository;
import unimib.ingsof.persistence.service.Protocol;
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
		Setting setting = this.getSetting(settingID);
		
		String value = settingObject.get(Protocol.VALUE_KEY);
		settingRepository.updateSetting(settingID, value);
		setting.setValue(value);
		return setting;
	}

	public void deleteSetting(String settingID) {
		settingRepository.deleteSetting(settingID);
	}
}