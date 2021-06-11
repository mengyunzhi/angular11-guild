package club.yunzhi.api.angualrguide.config;

import club.yunzhi.api.angualrguide.entity.Teacher;
import club.yunzhi.api.angualrguide.repository.TeacherRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * 数据初始化
 * https://spring.io/guides/tutorials/rest/
 */
@Configuration
public class DataInitConfig {
  private final TeacherRepository teacherRepository;

  public DataInitConfig(TeacherRepository teacherRepository) {
    this.teacherRepository = teacherRepository;
  }

  @Bean
  CommandLineRunner initDatabase(TeacherRepository teacherRepository) {
    return args -> {
      if (!this.teacherRepository.existsByUsername("zhangsan")) {
        teacherRepository.save(new Teacher("张三", "zhangsan", "zhangsan@yunzhiclub.com", true, "codedemo.club"));
        teacherRepository.save(new Teacher("李四", "lisi", "lisi@yunzhiclub.com", false, "codedemo.club"));
      }
    };
  }
}
