package unimib.ingsof;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories("unimib.ingsof.model")
@EntityScan("unimib.ingsof.model")
@ComponentScan("unimib.ingsof.controller")
public class Application {
	public static void executeSQL(String sql) {
		try (Connection con = DriverManager.getConnection("jdbc:sqlite:database.db");
				Statement s = con.createStatement()) {
			s.execute(sql);
		} catch (SQLException e) {
			System.out.println(sql);
			e.printStackTrace();
		}
	}
	
	public static void main(String[] args) {
		executeSQL("create table if not exists recipe (recipeID TEXT primary key, name TEXT NOT NULL);");
		executeSQL("create table if not exists recipe_ingredient (ingredientID TEXT NOT NULL, recipeID TEXT NOT NULL, quantity REAL NOT NULL, FOREIGN KEY (recipeID) REFERENCES recipe(recipeID) ON DELETE CASCADE, PRIMARY KEY (recipeID, ingredientID));");
		SpringApplication.run(Application.class, args);
	}
}