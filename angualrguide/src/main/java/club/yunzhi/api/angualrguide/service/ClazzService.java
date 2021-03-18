package club.yunzhi.api.angualrguide.service;

import club.yunzhi.api.angualrguide.entity.Clazz;

public interface ClazzService {
  Clazz getOneSavedClazz();
  Clazz getOneUnSavedClazz();

  Clazz save(Clazz clazz);
}
