package unimib.ingsof.logic;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import unimib.ingsof.exceptions.DoesntExistsException;
import unimib.ingsof.exceptions.ValidationException;
import unimib.ingsof.persistence.model.BeerNote;
import unimib.ingsof.persistence.repository.BeerNoteRepository;
import unimib.ingsof.validation.validators.BeerNoteUpdatingValidator;

@Service
public class BeerNoteController {
	@Autowired
	private BeerNoteRepository beerNoteRepository;
	
	public BeerNote getNote(String beerID, String noteID) throws DoesntExistsException {
		BeerNote beerNote = beerNoteRepository.getNote(beerID, noteID);
		if (beerNote == null)
			throw new DoesntExistsException();
		return beerNote;
	}
	
	public BeerNote updateNote(String beerID, String noteID, Map<String, String> noteObject) throws ValidationException, DoesntExistsException {
		BeerNote beerNote = beerNoteRepository.getNote(beerID, noteID);
		if (beerNote == null)
			throw new DoesntExistsException();
		
		noteObject = BeerNoteUpdatingValidator.getInstance().handle(noteObject);
		String noteType = noteObject.get("noteType");
		String description = noteObject.get("description");
		
		if (noteType != null)
			beerNoteRepository.updateNoteType(beerID, noteID, noteType);
		if (description != null)
			beerNoteRepository.updateNoteDescription(beerID, noteID, description);
		return this.getNote(beerID, noteID);
	}
	
	public void deleteNote(String beerID, String noteID) {
		this.beerNoteRepository.deleteNote(beerID, noteID);
	}
}