package club.yunzhi.api.angualrguide.config;

import club.yunzhi.api.angualrguide.entity.Teacher;
import club.yunzhi.api.angualrguide.repository.TeacherRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitConfig {

  @Bean
  CommandLineRunner initDatabase(TeacherRepository teacherRepository) {
    return args -> {
      teacherRepository.save(new Teacher("张三", "zhangsan", "zhangsan@yunzhiclub.com", true));
      teacherRepository.save(new Teacher("李四", "lisi", "lisi@yunzhiclub.com", false));
    };
  }
}
