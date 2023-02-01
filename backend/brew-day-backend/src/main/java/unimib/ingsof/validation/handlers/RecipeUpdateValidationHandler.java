package unimib.ingsof.validation.handlers;

import java.util.Map;

import unimib.ingsof.exceptions.ValidationException;
import unimib.ingsof.exceptions.WrongBodyException;

public class RecipeUpdateValidationHandler extends BaseValidationHandler {
	@Override
	public Map<String, String> handle(Map<String, String> object) throws ValidationException {
		if (object.get("name") == null && object.get("description") == null)
			throw new WrongBodyException();
		return super.handle(object);
	}
}