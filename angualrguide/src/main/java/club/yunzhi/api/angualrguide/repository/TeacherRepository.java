package club.yunzhi.api.angualrguide.repository;

import club.yunzhi.api.angualrguide.entity.Teacher;
import org.springframework.data.repository.CrudRepository;

public interface TeacherRepository extends CrudRepository<Teacher, Long> {
  boolean existsByUsername(String username);

  Teacher findByUsername(String username);
}