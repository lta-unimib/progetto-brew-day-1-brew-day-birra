package unimib.ingsof.validation.handlers;

import java.util.Map;

import unimib.ingsof.exceptions.ValidationException;
import unimib.ingsof.exceptions.WrongNameException;

public class SettingIDValidationHandler extends BaseValidationHandler {
	@Override
	public Map<String, String> handle(Map<String, String> object) throws ValidationException {
		if (object.get("settingID") == null)
			throw new WrongNameException();
		return super.handle(object);
	}
}