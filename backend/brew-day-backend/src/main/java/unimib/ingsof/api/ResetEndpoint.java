package unimib.ingsof.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import unimib.ingsof.exceptions.InternalServerException;
import unimib.ingsof.logic.ResetController;

@RestController
@RequestMapping("/api/reset")
public class ResetEndpoint {
	@Autowired
	private ResetController resetController;
	
	@PostMapping
	public ResponseEntity<Object> doReset() throws InternalServerException {
		resetController.doReset();
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
