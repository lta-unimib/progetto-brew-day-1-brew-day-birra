package unimib.ingsof.validation.handlers;

import java.util.Map;

import unimib.ingsof.exceptions.ValidationException;
import unimib.ingsof.exceptions.WrongBodyException;

public class NoteTypeUpdatingValidationHandler extends BaseValidationHandler {
	@Override
	public Map<String, String> handle(Map<String, String> object) throws ValidationException {
		String noteType = object.get("noteType");
		if (noteType != null)
			if (!(noteType.equals("taste")) && !(noteType.equals("generic")) )
				throw new WrongBodyException();
		
		object.put("noteType", noteType);
		return super.handle(object);
	}
}