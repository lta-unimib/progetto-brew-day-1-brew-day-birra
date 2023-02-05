package unimib.ingsof.validation.handlers;

import java.util.Map;

import unimib.ingsof.exceptions.ValidationException;

public class NameFormattingValidationHandler extends BaseValidationHandler {
	@Override
	public Map<String, String> handle(Map<String, String> object) throws ValidationException {
		object.put("name", object.get("name").toLowerCase().replace("  ", " "));
		return super.handle(object);
	}
}