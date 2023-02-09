package unimib.ingsof.validation.handlers;

import java.util.Map;
import unimib.ingsof.exceptions.ValidationException;
import unimib.ingsof.persistence.service.Protocol;

public class NameFormattingValidationHandler extends BaseValidationHandler {
	@Override
	public Map<String, String> handle(Map<String, String> object) throws ValidationException {
		object.put(Protocol.NAME_BODY_KEY, object.get(Protocol.NAME_BODY_KEY).toLowerCase().replace("  ", " "));
		return super.handle(object);
	}
}