package club.yunzhi.api.angualrguide.config;

import club.yunzhi.api.angualrguide.entity.Teacher;
import club.yunzhi.api.angualrguide.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * 数据初始化
 * https://spring.io/guides/tutorials/rest/
 */
@Configuration
public class DataInitConfig {

  @Bean
  CommandLineRunner initDatabase(TeacherRepository teacherRepository) {
    return args -> {
      teacherRepository.save(new Teacher("张三", "zhangsan", "zhangsan@yunzhiclub.com", true, "codedemo.club"));
      teacherRepository.save(new Teacher("李四", "lisi", "lisi@yunzhiclub.com", false, "codedemo.club"));
    };
  }
}
