package unimib.ingsof.generation.id;

import java.math.BigInteger;
import java.security.MessageDigest;

public class SeedHashingGenerator extends IDGenerator {
	private MessageDigest digest;
	
	public SeedHashingGenerator(MessageDigest digest) {
		super();
		this.digest = digest;
	}
	
	@Override
	protected String compute(String seed) {
		byte[] hash = digest.digest(seed.getBytes());
		return new BigInteger(hash).toString(16);
	}
}