package club.yunzhi.api.angualrguide.service;

import club.yunzhi.api.angualrguide.entity.Clazz;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ClazzService {
  Clazz getOneSavedClazz();
  Clazz getOneUnSavedClazz();
  Page<Clazz> pageOfCurrentTeacher(Pageable pageable);
  Clazz save(Clazz clazz);
}
