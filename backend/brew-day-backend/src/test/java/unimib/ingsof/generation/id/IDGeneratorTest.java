package unimib.ingsof.generation.id;

import java.util.TreeMap;

import org.junit.jupiter.api.Test;

class IDGeneratorTest {
	@Test
	void testBehavior() {
		IDGenerator generator = new IDGenerator();
		generator.generateID(new TreeMap<>());
	}
}
