package unimib.ingsof.api;

import static org.junit.Assert.assertTrue;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Map;
import java.util.TreeMap;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import unimib.ingsof.logic.ResetController;

@SpringBootTest
class SettingListEndpointTest {
	@Autowired
	ResetController resetController;
	@Autowired
	SettingListEndpoint settingListEndpoint;
	
	@Test
	void testBehavior() {
		resetController.doAssure();
		
		int oldnum = settingListEndpoint.getSettings().getBody().size();
		
		Map<String, String> settingBody = new TreeMap<>();
		assertTrue(settingListEndpoint.postSetting(settingBody).getStatusCode().is4xxClientError());
		
		settingBody.put("settingID", "theSettingID");
		assertTrue(settingListEndpoint.postSetting(settingBody).getStatusCode().is4xxClientError());
		
		settingBody.clear();
		settingBody.put("value", "theValue");
		assertTrue(settingListEndpoint.postSetting(settingBody).getStatusCode().is4xxClientError());

		settingBody.put("settingID", "theSettingID");
		assertTrue(settingListEndpoint.postSetting(settingBody).getStatusCode().is2xxSuccessful());
		assertTrue(settingListEndpoint.postSetting(settingBody).getStatusCode().is4xxClientError());
		
		assertEquals(oldnum + 1, settingListEndpoint.getSettings().getBody().size());
		
		resetController.doDrop();
	}
}
