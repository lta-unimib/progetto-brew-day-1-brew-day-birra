package unimib.ingsof.persistence.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import unimib.ingsof.exceptions.InternalServerException;
import unimib.ingsof.logic.ResetController;

@Service
public class Initializr {
	@Autowired
	ResetController resetController;
	
	@PostConstruct 
	public void init() throws InternalServerException {
		resetController.doAssure();
	}
}