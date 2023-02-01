package unimib.ingsof.validation.handlers;

import java.util.Map;

import unimib.ingsof.exceptions.ValidationException;
import unimib.ingsof.exceptions.WrongQuantityException;

public class QuantityValidationHandler extends BaseValidationHandler {
	public Map<String, String> handle(Map<String, String> object) throws ValidationException {
		if (object.get("quantity") == null)
			throw new WrongQuantityException();
		try {
			Float.parseFloat(object.get("quantity"));
		} catch(NumberFormatException exception) {
			throw new WrongQuantityException();
		}
		return super.handle(object);
	}
}