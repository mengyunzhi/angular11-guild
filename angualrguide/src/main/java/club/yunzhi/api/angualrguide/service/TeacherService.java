package club.yunzhi.api.angualrguide.service;

import java.util.Optional;

public interface TeacherService {
  /**
   * 将token与用户名绑定
   * @param xAuthToken token
   * @param username 用户名
   */
  void bindAuthTokenLoginUsername(String xAuthToken, String username);

  /**
   * 根据token获取用户名
   * @param authToken token
   * @return
   */
  Optional<String> getUsernameByToken(String authToken);
}
