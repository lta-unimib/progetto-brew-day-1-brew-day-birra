package unimib.ingsof.logic;

import java.util.ArrayList;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import unimib.ingsof.exceptions.DoesntExistsException;
import unimib.ingsof.exceptions.WrongBodyException;
import unimib.ingsof.persistence.model.Beer;
import unimib.ingsof.persistence.model.BeerNote;
import unimib.ingsof.persistence.repository.BeerNoteRepository;
import unimib.ingsof.persistence.repository.BeerRepository;
import unimib.ingsof.persistence.view.BeerNoteView;
import unimib.ingsof.persistence.view.BeerView;

@Service
public class BeerController {
	@Autowired
	private BeerRepository beerRepository;
	@Autowired
	private BeerNoteRepository beerNoteRepository;


	public BeerView getBeerByID(String beerID) throws DoesntExistsException {
		Beer beer = this.beerRepository.getBeer(beerID);
		if (beer == null)
			throw new DoesntExistsException();
		ArrayList<BeerNoteView> result =  new ArrayList<>();
		ArrayList<BeerNote> notes =  beerNoteRepository.getAll(beerID);
		if(notes != null) {
			for (BeerNote note : notes) {
				result.add(new BeerNoteView(note.getBeerID(), note.getNoteID(), note.getNoteType(), note.getDescription()));
			}
		}
		return new BeerView(beerID, beer.getName(), beer.getRecipeID(), result);
	}
	
	public BeerView updateBeer(String beerID, Map<String, String> beerObject) throws DoesntExistsException, WrongBodyException {
		Beer beer = this.beerRepository.getBeer(beerID);
		if (beer == null)
			throw new DoesntExistsException();
		if (beerObject == null)
			throw new WrongBodyException();
		
		String newName = beerObject.get("name");
		if (newName == null)
			throw new WrongBodyException();
		
		this.beerRepository.updateBeer(beerID, newName);
		return this.getBeerByID(beerID);
	}
	
	public void deleteBeer(String beerID) {
		this.beerRepository.deleteBeer(beerID);
	}
	
	public String addBeerNote(String beerID, Map<String, String> noteObject) throws WrongBodyException, NumberFormatException {
		if (noteObject == null)
			throw new WrongBodyException();
		
		String noteType = noteObject.get("noteType");
		String description = noteObject.get("description");
		
		if (noteType == null)
			noteType = "Generic";
		
		if (description == null)
			noteType = "";
		
		String noteID = "booooooooooooooooooo";
		this.beerNoteRepository.addNote(beerID, noteID, noteType, description);
		return noteID;
	}
}