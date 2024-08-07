package ssafy.c205.ott;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class OttApplication {

	public static void main(String[] args) {
		SpringApplication.run(OttApplication.class, args);
	}

}
