package unimib.ingsof.generation.id;

import static org.junit.Assert.assertTrue;

import java.util.TreeMap;

import org.junit.jupiter.api.Test;

class IDGeneratorTest {
	@Test
	void testBehavior() {
		IDGenerator generator = new IDGenerator();
		assertTrue(generator.generateID(new TreeMap<>()).equals("{}"));
	}
}
