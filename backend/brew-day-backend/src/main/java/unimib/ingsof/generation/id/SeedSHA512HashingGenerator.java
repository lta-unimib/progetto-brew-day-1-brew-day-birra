package unimib.ingsof.generation.id;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class SeedSHA512HashingGenerator extends SeedHashingGenerator {
	public SeedSHA512HashingGenerator() throws NoSuchAlgorithmException {
		super(MessageDigest.getInstance("SHA-512"));
	}
}