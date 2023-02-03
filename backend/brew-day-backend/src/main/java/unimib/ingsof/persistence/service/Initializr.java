package unimib.ingsof.persistence.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import unimib.ingsof.logic.ResetController;

@Service
public class Initializr {
	@Autowired
	ResetController resetController;
	
	@PostConstruct 
	public void init() {
		resetController.doAssure();
	}
}