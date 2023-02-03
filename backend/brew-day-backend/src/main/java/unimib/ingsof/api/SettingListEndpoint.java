package unimib.ingsof.api;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import unimib.ingsof.exceptions.AlreadyExistsException;
import unimib.ingsof.exceptions.ValidationException;
import unimib.ingsof.logic.SettingListController;

@RestController
@RequestMapping("/api/settings")
public class SettingListEndpoint {
	@Autowired
	private SettingListController settingListController;
	
	@GetMapping
	public ResponseEntity<Object> getSettings() {
		return new ResponseEntity<>(settingListController.getSettings(), HttpStatus.OK);
	}

	@PostMapping
	public ResponseEntity<Object> postSetting(@RequestBody Map<String, String> settingObject) {
		try {
			String settingID = settingListController.addSetting(settingObject);
			HttpHeaders headers = new HttpHeaders();
			headers.add("settingID", settingID);
			return new ResponseEntity<>(headers, HttpStatus.OK);
		} catch(ValidationException|AlreadyExistsException exception) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		} catch(Exception exception) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
