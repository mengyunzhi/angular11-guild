package club.yunzhi.api.angualrguide.service;

import club.yunzhi.api.angualrguide.entity.Teacher;

import java.util.Optional;

public interface TeacherService {
  /**
   * 将token与用户名绑定
   *
   * @param xAuthToken token
   * @param auth       是否是认证用户
   * @param teacher   用户
   */
  void bindAuthTokenLoginUsername(String xAuthToken, Teacher teacher, boolean auth);

  Teacher getOneSavedTeacher();

  Teacher getOneUnsavedTeacher();

  /**
   * 根据token获取用户名
   *
   * @param authToken token
   * @return
   */
  Optional<Teacher> getUserByToken(String authToken);

  /**
   * 是否为认证token
   *
   * @param authToken 认证token
   * @return
   */
  boolean isAuth(String authToken);

  /**
   * 注销
   *
   * @param token 令牌
   */
  void logout(String token);

  /**
   * 重新将token绑定到其它用户名，适用于更新用户
   * @param token
   * @param teacher
   */
  void reBindAuthToken(String token, Teacher teacher);
}
