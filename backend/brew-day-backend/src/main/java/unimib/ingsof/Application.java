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
	public static void main(String[] args) {
		try {
			Connection con = DriverManager.getConnection("jdbc:sqlite:database.db");
			String sql = "create table if not exists recipe_ingredient (recipeID varchar(10), ingredientID varchar(10) primary key, quantity real);";
			try (Statement s = con.createStatement()) {
				s.execute(sql);
            }
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		SpringApplication.run(Application.class, args);
	}
}