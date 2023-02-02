package unimib.ingsof.logic;

import java.util.ArrayList;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import unimib.ingsof.exceptions.DoesntExistsException;
import unimib.ingsof.exceptions.ValidationException;
import unimib.ingsof.exceptions.WrongIDGenerationInitialization;
import unimib.ingsof.generation.id.IDGenerationFacade;
import unimib.ingsof.persistence.model.Beer;
import unimib.ingsof.persistence.model.BeerNote;
import unimib.ingsof.persistence.repository.BeerNoteRepository;
import unimib.ingsof.persistence.repository.BeerRepository;
import unimib.ingsof.persistence.view.BeerView;
import unimib.ingsof.validation.validators.BeerNoteInitializationValidator;
import unimib.ingsof.validation.validators.BeerUpdatingValidator;

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
		ArrayList<BeerNote> notes =  beerNoteRepository.getAll(beerID);
		return new BeerView(beerID, beer.getName(), beer.getRecipeID(), notes);
	}
	
	public BeerView updateBeer(String beerID, Map<String, String> beerObject) throws DoesntExistsException, ValidationException {
		Beer beer = this.beerRepository.getBeer(beerID);
		if (beer == null)
			throw new DoesntExistsException();
		beerObject = BeerUpdatingValidator.getInstance().handle(beerObject);
		
		String newName = beerObject.get("name");
		this.beerRepository.updateBeer(beerID, newName);
		return this.getBeerByID(beerID);
	}
	
	public void deleteBeer(String beerID) {
		this.beerRepository.deleteBeer(beerID);
	}
	
	public String addBeerNote(String beerID, Map<String, String> noteObject) throws ValidationException, WrongIDGenerationInitialization, DoesntExistsException {

		if(!beerRepository.getAllBeerIDs().contains(beerID))
			throw new DoesntExistsException();
			
		noteObject = BeerNoteInitializationValidator.getInstance().handle(noteObject);
		String noteType = noteObject.get("noteType");
		String description = noteObject.get("description");
		String noteID = IDGenerationFacade.getInstance().generateNoteID(noteObject);
		this.beerNoteRepository.addNote(beerID, noteID, noteType, description);
		return noteID;
	}
}