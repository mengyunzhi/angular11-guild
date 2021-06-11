package club.yunzhi.api.angualrguide.service;

import club.yunzhi.api.angualrguide.annotation.OwnerAuthority;
import club.yunzhi.api.angualrguide.entity.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

/**
 * 学生
 */
public interface StudentService extends OwnerAuthority {
  void batchDeleteIds(List<Long> ids);

  void deleteById(Long id);

  Student getById(Long id);

  Boolean numberIsExist(String number);

  Page<Student> pageOfCurrentTeacher(Pageable pageable);

  Student save(Student student);

  Student update(Long id, Student student);
}
