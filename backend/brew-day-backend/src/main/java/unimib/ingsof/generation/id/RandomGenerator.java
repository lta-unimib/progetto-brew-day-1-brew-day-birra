package unimib.ingsof.generation.id;

import java.util.Map;

public class RandomGenerator extends IDGenerator {
	public RandomGenerator() {
		super();
	}
	
	@Override
	protected String preprocess(Map<String, String> seed) {
		seed.put("random", Math.random() + "");
		return seed.toString();
	}
}