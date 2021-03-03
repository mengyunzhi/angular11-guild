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

@Service
public class TeacherServiceImpl implements TeacherService, UserDetailsService {
  private final TeacherRepository teacherRepository;
  private final HashMap<String, ExpiredUsername> hashMap = new HashMap<>();

  public TeacherServiceImpl(TeacherRepository teacherRepository) {
    this.teacherRepository = teacherRepository;
  }

  @Override
  public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
    Teacher teacher = this.teacherRepository.findByUsername(s);
    if (null == teacher) {
      throw new UsernameNotFoundException("用户不存在");
    }
    return new User(s, teacher.getPassword(), new ArrayList<>());
  }

  @Override
  public void bindLoginUser(String xAuthToken, String name) {
    this.hashMap.put(xAuthToken, new ExpiredUsername(name));
  }

  @Override
  public Optional<String> getByToken(String authToken) {
    if (this.hashMap.containsKey(authToken)) {
      ExpiredUsername expiredUsername = this.hashMap.get(authToken);
      if (expiredUsername.isExpired()) {
          hashMap.remove(authToken);
      } else {
        expiredUsername.resetExpiredTime();
        return Optional.of(expiredUsername.getUsername());
      }
    }

    return Optional.empty();
  }

  private class ExpiredUsername {
    private String username;
    private Timestamp expiredTime;
    private long effectiveDuration = 30 * 60 * 1000;

    public ExpiredUsername(String username) {
      this.username = username;
      this.expiredTime = new Timestamp(System.currentTimeMillis() + effectiveDuration);
    }

    public void resetExpiredTime() {
      this.expiredTime.setTime(System.currentTimeMillis() + effectiveDuration);
    }

    public boolean isExpired() {
      return System.currentTimeMillis() - this.expiredTime.getTime() > 0;
    }

    public String getUsername() {
      return username;
    }
  }
}

