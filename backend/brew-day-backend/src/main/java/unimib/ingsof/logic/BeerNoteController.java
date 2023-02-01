package unimib.ingsof.logic;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import unimib.ingsof.exceptions.DoesntExistsException;
import unimib.ingsof.exceptions.WrongBodyException;
import unimib.ingsof.persistence.model.BeerNote;
import unimib.ingsof.persistence.repository.BeerNoteRepository;
import unimib.ingsof.persistence.view.BeerNoteView;

@Service
public class BeerNoteController {
	@Autowired
	private BeerNoteRepository beerNoteRepository;
	
	public BeerNoteView getNote(String beerID, String noteID) throws DoesntExistsException {
		BeerNote beerNote = beerNoteRepository.getNote(beerID, noteID);
		
		if (beerNote == null)
			throw new DoesntExistsException();
		
		return new BeerNoteView(beerNote.getBeerID(),
										beerNote.getNoteID(),
										beerNote.getNoteType(),
										beerNote.getDescription());
	}
	
	public BeerNoteView updateNote(String beerID, String noteID, Map<String, String> noteObject) throws WrongBodyException, DoesntExistsException, NumberFormatException {
		if (noteObject == null)
			throw new WrongBodyException();
		
		String noteType = noteObject.get("noteType");
		String description = noteObject.get("description");
		
		if (noteType == null)
			noteType = "Generic";
		
		if (description == null)
			noteType = "";
		
		BeerNote beerNote = beerNoteRepository.getNote(beerID, noteID);
		if (beerNote == null)
			throw new DoesntExistsException();
			
		beerNoteRepository.updateNote(beerID, noteID, noteType, description);
		return this.getNote(beerID, noteID);
	}
	
	public void deleteNote(String beerID, String noteID) {
		this.beerNoteRepository.deleteNote(beerID, noteID);
	}
}