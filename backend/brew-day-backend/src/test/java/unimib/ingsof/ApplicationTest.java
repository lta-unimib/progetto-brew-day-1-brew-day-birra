package unimib.ingsof;

import static org.junit.Assert.assertNotEquals;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class ApplicationTest {
	@Test
	void datasourceTest() {
		DatasourceConfiguration config = new DatasourceConfiguration();
		assertNotEquals(config.getDataSource(), null);
	}
}