package unimib.ingsof.generation.id;

import static org.junit.Assert.fail;

import java.security.NoSuchAlgorithmException;
import java.util.TreeMap;

import org.junit.jupiter.api.Test;

class SeedSHA1HashingGeneratorTest {
	@Test
	void testBehavior() {
		try {
			IDGenerator generator = new SeedSHA1HashingGenerator();
			generator.generateID(new TreeMap<>());
		} catch (NoSuchAlgorithmException e) {
			fail();
		}
	}
}