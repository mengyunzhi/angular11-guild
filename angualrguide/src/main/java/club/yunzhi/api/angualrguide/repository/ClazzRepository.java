package club.yunzhi.api.angualrguide.repository;

import club.yunzhi.api.angualrguide.entity.Clazz;
import club.yunzhi.api.angualrguide.entity.Teacher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface ClazzRepository extends PagingAndSortingRepository<Clazz, Long> {
  Page<Clazz> findAllByCreateTeacher(Teacher teacher, Pageable pageable);
}
