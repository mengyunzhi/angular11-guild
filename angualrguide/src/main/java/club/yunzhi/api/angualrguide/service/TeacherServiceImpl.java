package club.yunzhi.api.angualrguide.service;

import club.yunzhi.api.angualrguide.entity.Teacher;
import club.yunzhi.api.angualrguide.repository.TeacherRepository;
import net.bytebuddy.utility.RandomString;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.*;

/**
 * 教师
 */
@Service
public class TeacherServiceImpl implements TeacherService, UserDetailsService, AuditorAware<Teacher> {
  private final Logger logger = LoggerFactory.getLogger(this.getClass());
  private final TeacherRepository teacherRepository;
  private final HashMap<String, ExpiredUser> hashMap = new HashMap<>();

  public TeacherServiceImpl(TeacherRepository teacherRepository) {
    this.teacherRepository = teacherRepository;
  }


  /**
   * 绑定xAuthToken
   *
   * @param xAuthToken token
   * @param teacher       匿名用户传入null
   */
  @Override
  public void bindAuthTokenLoginUsername(String xAuthToken, Teacher teacher, boolean auth) {
    this.hashMap.put(xAuthToken, new ExpiredUser(teacher, auth));
  }

  @Override
  public Teacher getOneSavedTeacher() {
    Teacher teacher = this.getOneUnsavedTeacher();
    this.teacherRepository.save(teacher);
    return teacher;
  }

  @Override
  public Teacher getOneUnsavedTeacher() {
    Teacher teacher = new Teacher();
    teacher.setName(new RandomString().nextString());
    teacher.setUsername(new RandomString().nextString());
    teacher.setPassword(new RandomString().nextString());
    teacher.setSex(new Random().nextBoolean());
    return teacher;
  }

  /**
   * 通过token获取用户名，token无效失效均返回empty
   *
   * @param authToken token
   * @return
   */
  @Override
  public Optional<Teacher> getUserByToken(String authToken) {
    if (this.hashMap.containsKey(authToken)) {
      ExpiredUser expiredUser = this.hashMap.get(authToken);
      if (expiredUser.isExpired()) {
        hashMap.remove(authToken);
      } else {
        expiredUser.resetExpiredTime();
        if (null != expiredUser.getTeacher()) {
          return Optional.of(expiredUser.getTeacher());
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
      ExpiredUser expiredUser = this.hashMap.get(authToken);
      if (expiredUser.isExpired()) {
        hashMap.remove(authToken);
      } else {
        return expiredUser.isAuth();
      }
    }

    return false;
  }

  /**
   * 根据用户名获取用户
   *
   * @param username 用户名
   * @return
   * @throws UsernameNotFoundException
   */
  @Override
  public UserDetail loadUserByUsername(String username) throws UsernameNotFoundException {
    Teacher teacher = this.teacherRepository.findByUsername(username);
    if (null == teacher) {
      throw new UsernameNotFoundException("用户不存在");
    }
    return new UserDetail(teacher, new ArrayList<>());
  }

  @Override
  public void logout(String token) {
    if (this.hashMap.containsKey(token)) {
      this.hashMap.remove(token);
    }
  }

  @Override
  public void reBindAuthToken(String token, Teacher teacher) {
    if (this.hashMap.containsKey(token)) {
      ExpiredUser expiredUser = this.hashMap.get(token);
      expiredUser.setTeacher(teacher);
    }
  }

  @Override
  public Optional<Teacher> getCurrentAuditor() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (null == authentication) {
      return Optional.empty();
    } else {
      try {
        UserDetail userDetail = (UserDetail) authentication.getPrincipal();
        return Optional.of(userDetail.getTeacher());
      } catch (Exception e) {
        this.logger.error("接收到了认证用户类型不正确,请在loadUserByUsername中返回UserDetail");
        throw e;
      }
    }
  }

  public static class UserDetail extends User {
    private Teacher teacher;

    public UserDetail(Teacher teacher, Collection<? extends GrantedAuthority> authorities) {
      super(teacher.getUsername(), teacher.getPassword(), authorities);
      this.teacher = teacher;
    }

    public Teacher getTeacher() {
      return teacher;
    }
  }

  /**
   * 有过期时间设定的用户名缓存
   */
  private class ExpiredUser {
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
    private Teacher teacher;

    public ExpiredUser(Teacher teacher, boolean auth) {
      this.teacher = teacher;
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

    public void setTeacher(Teacher teacher) {
      this.teacher = teacher;
    }

    /**
     * 用户名
     *
     * @return
     */
    public Teacher getTeacher() {
      return teacher;
    }

    public boolean isAuth() {
      return auth;
    }
  }
}

