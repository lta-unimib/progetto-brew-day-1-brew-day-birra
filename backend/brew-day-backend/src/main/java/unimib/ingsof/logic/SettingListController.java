package unimib.ingsof.logic;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import unimib.ingsof.exceptions.AlreadyExistsException;
import unimib.ingsof.exceptions.ValidationException;
import unimib.ingsof.persistence.model.Setting;
import unimib.ingsof.persistence.repository.SettingRepository;
import unimib.ingsof.persistence.service.Protocol;
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
		String settingID = settingObject.get(Protocol.SETTING_ID_BODY_KEY);
		String value = settingObject.get(Protocol.VALUE_BODY_KEY);
		
		Setting setting = settingRepository.getSetting(settingID);
		if (setting != null)
			throw new AlreadyExistsException();
		
		settingRepository.addSetting(settingID, value);
		return settingID;
	}
}