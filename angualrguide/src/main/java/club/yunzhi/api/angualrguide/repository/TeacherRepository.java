package club.yunzhi.api.angualrguide.repository;

import club.yunzhi.api.angualrguide.entity.Teacher;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;


public interface TeacherRepository extends CrudRepository<Teacher, Long>, PagingAndSortingRepository<Teacher, Long> {

  boolean existsByUsername(String username);

  Teacher findByUsername(String username);
}