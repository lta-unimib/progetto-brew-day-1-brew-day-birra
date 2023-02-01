package unimib.ingsof.validation.handlers;

import java.util.Map;

import unimib.ingsof.exceptions.ValidationException;
import unimib.ingsof.exceptions.WrongBodyException;

public class NoteTypeDefaultingValidationHandler extends BaseValidationHandler {
	@Override
	public Map<String, String> handle(Map<String, String> object) throws ValidationException {
		String noteType = object.get("noteType");
		if (noteType == null)
			noteType = "generic";
		else {
			if (! noteType.equals("taste"))
				throw new WrongBodyException();
		}
		
		object.put("noteType", noteType);
		return super.handle(object);
	}
}