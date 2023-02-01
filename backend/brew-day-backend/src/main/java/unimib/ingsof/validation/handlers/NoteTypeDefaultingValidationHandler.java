package unimib.ingsof.validation.handlers;

import java.util.Map;

import unimib.ingsof.exceptions.ValidationException;
import unimib.ingsof.exceptions.WrongBodyException;

public class NoteTypeDefaultingValidationHandler extends BaseValidationHandler {
	@Override
	public Map<String, String> handle(Map<String, String> object) throws ValidationException {
		if (object.get("noteType") == null)
			object.put("noteType", "generic");
		else {
			if (! object.get("noteType").equals("taste"))
				throw new WrongBodyException();
		}
		return super.handle(object);
	}
}