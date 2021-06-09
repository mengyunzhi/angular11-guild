package club.yunzhi.api.angualrguide.repository;

import club.yunzhi.api.angualrguide.entity.Student;
import club.yunzhi.api.angualrguide.entity.Teacher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * 学生
 */
public interface StudentRepository extends PagingAndSortingRepository<Student, Long> {
  Boolean existsByNumber(String number);

  Page<Student> findAllByClazzTeacher(Teacher teacher, Pageable pageable);
}
