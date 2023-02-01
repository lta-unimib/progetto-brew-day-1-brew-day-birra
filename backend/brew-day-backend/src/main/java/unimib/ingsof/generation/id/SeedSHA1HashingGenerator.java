package unimib.ingsof.generation.id;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class SeedSHA1HashingGenerator extends SeedHashingGenerator {
	public SeedSHA1HashingGenerator() throws NoSuchAlgorithmException {
		super(MessageDigest.getInstance("SHA-1"));
	}
}