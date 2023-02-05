package unimib.ingsof.validation.handlers;

import java.util.Map;

import unimib.ingsof.exceptions.ValidationException;
import unimib.ingsof.exceptions.WrongBodyException;
import unimib.ingsof.persistence.service.Protocol;

public class NoteTypeDefaultingValidationHandler extends BaseValidationHandler {
	@Override
	public Map<String, String> handle(Map<String, String> object) throws ValidationException {
		String noteType = object.get(Protocol.NOTETYPE_KEY);
		if (noteType == null)
			noteType = "generic";
		else {
			if (!(noteType.equals("taste")) && !(noteType.equals("generic")) )
				throw new WrongBodyException();
		}
		
		object.put("noteType", noteType);
		return super.handle(object);
	}
}