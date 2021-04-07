package club.yunzhi.api.angualrguide.service;

import club.yunzhi.api.angualrguide.annotation.OwnerAuthority;
import club.yunzhi.api.angualrguide.entity.Clazz;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ClazzService extends OwnerAuthority {
  Clazz getOneSavedClazz();
  Clazz getOneUnSavedClazz();
  Page<Clazz> pageOfCurrentTeacher(Pageable pageable);
  Clazz save(Clazz clazz);

  Clazz getById(Long id);
}
