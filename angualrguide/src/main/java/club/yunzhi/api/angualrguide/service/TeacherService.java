package club.yunzhi.api.angualrguide.service;

import java.util.Optional;

public interface TeacherService {
  void bindLoginUser(String xAuthToken, String name);

  Optional<String> getByToken(String authToken);
}
