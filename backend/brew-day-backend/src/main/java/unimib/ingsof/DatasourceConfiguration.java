package unimib.ingsof;

import javax.sql.DataSource;

import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

//@Configuration
public class DatasourceConfiguration {
    @Bean
    public DataSource getDataSource() {
        return DataSourceBuilder.create()
          .driverClassName("org.sqlite.JDBC")
          .url("jdbc:sqlite::memory:")
          .build();	
    }
}