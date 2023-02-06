package unimib.ingsof.logic;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import unimib.ingsof.exceptions.DoesntExistsException;
import unimib.ingsof.exceptions.ValidationException;
import unimib.ingsof.persistence.model.BeerNote;
import unimib.ingsof.persistence.repository.BeerNoteRepository;
import unimib.ingsof.persistence.service.Protocol;
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
		noteObject = BeerNoteUpdatingValidator.getInstance().handle(noteObject);
		String noteType = noteObject.get(Protocol.NOTETYPE_KEY);
		String description = noteObject.get(Protocol.DESCRIPTION_KEY);
		BeerNote beerNote = this.getNote(beerID, noteID);
		
		if (noteType != null) {
			beerNoteRepository.updateNoteType(beerID, noteID, noteType);
			beerNote.setNoteType(noteType);
		}
		
		if (description != null) {
			beerNoteRepository.updateNoteDescription(beerID, noteID, description);
			beerNote.setDescription(description);
		}
		
		return beerNote;
	}
	
	public void deleteNote(String beerID, String noteID) {
		this.beerNoteRepository.deleteNote(beerID, noteID);
	}
}