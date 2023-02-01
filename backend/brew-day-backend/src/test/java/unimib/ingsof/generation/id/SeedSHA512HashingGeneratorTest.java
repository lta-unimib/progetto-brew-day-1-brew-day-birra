package unimib.ingsof.generation.id;

import static org.junit.Assert.fail;

import java.security.NoSuchAlgorithmException;
import java.util.TreeMap;

import org.junit.jupiter.api.Test;

class SeedSHA512HashingGeneratorTest {
	@Test
	void testBehavior() {
		try {
			IDGenerator generator = new SeedSHA512HashingGenerator();
			generator.generateID(new TreeMap<>());
		} catch (NoSuchAlgorithmException e) {
			fail();
		}
	}
}