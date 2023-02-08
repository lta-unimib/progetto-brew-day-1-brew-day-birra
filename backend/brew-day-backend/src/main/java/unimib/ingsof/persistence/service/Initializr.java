package unimib.ingsof.persistence.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import unimib.ingsof.exceptions.AlreadyExistsException;
import unimib.ingsof.exceptions.DoesntExistsException;
import unimib.ingsof.exceptions.ValidationException;
import unimib.ingsof.logic.ResetController;

@Service
public class Initializr {
	@Autowired
	ResetController resetController;
	
	@PostConstruct 
	public void init() throws ValidationException, AlreadyExistsException, DoesntExistsException {
		resetController.doAssure();
	}
}