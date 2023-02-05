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
import unimib.ingsof.persistence.service.Protocol;
import unimib.ingsof.persistence.view.BeerDetailsView;
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
		BeerDetailsView beer = this.getBeerDetailsByID(beerID);
		ArrayList<BeerNote> notes =  beerNoteRepository.getAll(beerID);
		return new BeerView(beerID, beer.getName(), beer.getRecipeID(), notes);
	}

	public BeerDetailsView getBeerDetailsByID(String beerID) throws DoesntExistsException {
		Beer beer = this.beerRepository.getBeer(beerID);
		if (beer == null)
			throw new DoesntExistsException();
		return new BeerDetailsView(beerID, beer.getName(), beer.getRecipeID());
	}
	
	public BeerView updateBeer(String beerID, Map<String, String> beerObject) throws DoesntExistsException, ValidationException {
		beerObject = BeerUpdatingValidator.getInstance().handle(beerObject);
		BeerView beer = this.getBeerByID(beerID);
		
		String newName = beerObject.get(Protocol.NAME_KEY);
		this.beerRepository.updateBeer(beerID, newName);
		beer.setName(newName);
		return beer;
	}
	
	public void deleteBeer(String beerID) {
		this.beerRepository.deleteBeer(beerID);
	}
	
	public String addBeerNote(String beerID, Map<String, String> noteObject) throws ValidationException, WrongIDGenerationInitialization, DoesntExistsException {
		this.getBeerDetailsByID(beerID);
		noteObject = BeerNoteInitializationValidator.getInstance().handle(noteObject);
		String noteType = noteObject.get(Protocol.NOTETYPE_KEY);
		String description = noteObject.get(Protocol.DESCRIPTION_KEY);

		String noteID = "";
		while(true) {
			noteID = IDGenerationFacade.getInstance().generateBeerID(noteObject);
			if (beerNoteRepository.getNote(beerID, noteID) == null)
				break;
		}
		
		this.beerNoteRepository.addNote(beerID, noteID, noteType, description);
		return noteID;
	}
}