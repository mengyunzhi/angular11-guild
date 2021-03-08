package club.yunzhi.api.angualrguide.service;

import club.yunzhi.api.angualrguide.entity.Teacher;
import club.yunzhi.api.angualrguide.repository.TeacherRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Optional;
import java.util.Random;

/**
 * 教师
 */
@Service
public class TeacherServiceImpl implements TeacherService, UserDetailsService {
  private final TeacherRepository teacherRepository;
  private final HashMap<String, ExpiredUsername> hashMap = new HashMap<>();

  public TeacherServiceImpl(TeacherRepository teacherRepository) {
    this.teacherRepository = teacherRepository;
  }

  /**
   * 根据用户名获取用户
   *
   * @param s 用户名
   * @return
   * @throws UsernameNotFoundException
   */
  @Override
  public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
    Teacher teacher = this.teacherRepository.findByUsername(s);
    if (null == teacher) {
      throw new UsernameNotFoundException("用户不存在");
    }
    return new User(s, teacher.getPassword(), new ArrayList<>());
  }

  /**
   * 绑定xAuthToken
   *
   * @param xAuthToken token
   * @param name       匿名用户传入null
   */
  @Override
  public void bindAuthTokenLoginUsername(String xAuthToken, String name, boolean auth) {
    this.hashMap.put(xAuthToken, new ExpiredUsername(name, auth));
  }

  /**
   * 通过token获取用户名，token无效失效均返回empty
   *
   * @param authToken token
   * @return
   */
  @Override
  public Optional<String> getUsernameByToken(String authToken) {
    if (this.hashMap.containsKey(authToken)) {
      ExpiredUsername expiredUsername = this.hashMap.get(authToken);
      if (expiredUsername.isExpired()) {
        hashMap.remove(authToken);
      } else {
        expiredUsername.resetExpiredTime();
        if (null != expiredUsername.getUsername()) {
          return Optional.of(expiredUsername.getUsername());
        }
      }
    }

    // 1/10概率清空已过期数据
    if (new Random().nextInt() % 10 == 0) {
      this.hashMap.forEach((key, value) -> {
        if (value.isExpired()) {
          this.hashMap.remove(key);
        }
      });
    }

    return Optional.empty();
  }

  @Override
  public boolean isAuth(String authToken) {
    if (this.hashMap.containsKey(authToken)) {
      ExpiredUsername expiredUsername = this.hashMap.get(authToken);
      if (expiredUsername.isExpired()) {
        hashMap.remove(authToken);
      } else {
        return expiredUsername.isAuth();
      }
    }

    return false;
  }

  /**
   * 有过期时间设定的用户名缓存
   */
  private class ExpiredUsername {
    private final boolean auth;
    /**
     * 有效时长半小时
     */
    private final long effectiveDuration = 30 * 60 * 1000;
    /**
     * 过期时间
     */
    private Timestamp expiredTime;
    /**
     * 用户名
     */
    private String username;

    public ExpiredUsername(String username, boolean auth) {
      this.username = username;
      this.auth = auth;
      this.expiredTime = new Timestamp(System.currentTimeMillis() + effectiveDuration);
    }

    /**
     * 重置过期时间为半小时以后
     */
    public void resetExpiredTime() {
      this.expiredTime.setTime(System.currentTimeMillis() + effectiveDuration);
    }

    /**
     * 判断是否过期
     *
     * @return
     */
    public boolean isExpired() {
      return System.currentTimeMillis() - this.expiredTime.getTime() > 0;
    }

    /**
     * 用户名
     *
     * @return
     */
    public String getUsername() {
      return username;
    }

    public boolean isAuth() {
      return auth;
    }
  }
}

