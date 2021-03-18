package club.yunzhi.api.angualrguide;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class AngualrguideApplication {

	public static void main(String[] args) {
		SpringApplication.run(AngualrguideApplication.class, args);
	}

}
