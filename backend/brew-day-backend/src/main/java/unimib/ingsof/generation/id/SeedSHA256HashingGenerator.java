package unimib.ingsof.generation.id;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class SeedSHA256HashingGenerator extends SeedHashingGenerator {
	public SeedSHA256HashingGenerator() throws NoSuchAlgorithmException {
		super(MessageDigest.getInstance("SHA-256"));
	}
}