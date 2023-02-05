package unimib.ingsof.generation.id;

import java.security.MessageDigest;
import java.util.Base64;

public class SeedHashingGenerator extends IDGenerator {
	private MessageDigest digest;
	
	public SeedHashingGenerator(MessageDigest digest) {
		super();
		this.digest = digest;
	}
	
	@Override
	protected String compute(String seed) {
		byte[] hash = digest.digest(seed.getBytes());
		return Base64.getEncoder().encodeToString(hash).replace("/", "-").replace("+", "-");
	}
}