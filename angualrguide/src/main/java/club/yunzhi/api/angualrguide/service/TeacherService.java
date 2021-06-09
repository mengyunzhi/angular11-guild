package club.yunzhi.api.angualrguide.service;

import club.yunzhi.api.angualrguide.entity.Teacher;

import java.util.Optional;

public interface TeacherService {
  /**
   * 将token与用户名绑定
   *
   * @param xAuthToken token
   * @param auth       是否是认证用户
   * @param teacher    用户
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
   * 获取当前认证用户
   *
   * @return 未认证则返回empty
   */
  Optional<Teacher> getCurrentAuditor();

  /**
   * 是否为认证token
   *
   * @param authToken 认证token
   * @return
   */
  boolean isAuth(String authToken);

  /**
   * 注销
   */
  void logout();
}
