package airfly;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan("model")
public class AirFlySpringApplication {

	public static void main(String[] args) {
		SpringApplication.run(AirFlySpringApplication.class, args);
	}

}
