package club.yunzhi.api.angualrguide.controller;

import club.yunzhi.api.angualrguide.config.MvcSecurityConfig;
import club.yunzhi.api.angualrguide.entity.Teacher;
import club.yunzhi.api.angualrguide.repository.TeacherRepository;
import club.yunzhi.api.angualrguide.service.TeacherService;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityExistsException;
import javax.servlet.http.HttpServletRequest;
import java.security.Principal;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("teacher")
public class TeacherController {
  private final TeacherRepository teacherRepository;
  private final TeacherService teacherService;
  public TeacherController(TeacherRepository teacherRepository, TeacherService teacherService) {
    this.teacherRepository = teacherRepository;
    this.teacherService = teacherService;
  }

  @DeleteMapping("{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deleteById(@PathVariable long id) {
    if (id < 3) {
      throw new AccessDeniedException("无权删除系统预留教师");
    }
    this.teacherRepository.deleteById(id);
  }

  @GetMapping
  @JsonView(GetAllJsonView.class)
  public List<Teacher> getAll() {
    return (List<Teacher>) this.teacherRepository.findAll();
  }

  @GetMapping("{id}")
  @JsonView(GetByIdJsonView.class)
  public Teacher getById(@PathVariable Long id) {
    return this.teacherRepository.findById(id)
        .orElseThrow(() -> new NoSuchElementException());
  }

  @RequestMapping("login")
  @JsonView(LoginJsonView.class)
  public Teacher login(Principal user) {
    return this.teacherRepository.findByUsername(user.getName());
  }


  @RequestMapping("logout")
  public void logout(HttpServletRequest request) {
    String token = request.getHeader(MvcSecurityConfig.xAuthTokenKey);
    if (null == token) {
      throw new RuntimeException("未获取到token，请检查调用的逻辑性或配置的安全规则是否正常");
    }
    this.teacherService.logout(token);
  }


  @GetMapping("me")
  @JsonView(MeJsonView.class)
  public Teacher me(Principal user) {
    return this.teacherRepository.findByUsername(user.getName());
  }


  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  @JsonView(SaveJsonView.class)
  public Teacher save(@RequestBody Teacher teacher) {
    if (this.teacherRepository.existsByUsername(teacher.getUsername())) {
      throw new EntityExistsException("用户名已存在");
    }
    return this.teacherRepository.save(teacher);
  }

  @PutMapping("{id}")
  @ResponseStatus(HttpStatus.ACCEPTED)
  @JsonView(UpdateJsonView.class)
  public Teacher update(@PathVariable Long id, @RequestBody Teacher teacher) {
    Teacher oldTeacher = this.teacherRepository.findById(id).orElseThrow(() -> new NoSuchElementException());
    oldTeacher.setName(teacher.getName());
    oldTeacher.setEmail(teacher.getEmail());
    oldTeacher.setSex(teacher.getSex());
    oldTeacher.setUsername(teacher.getUsername());
    return this.teacherRepository.save(oldTeacher);
  }

  private interface LoginJsonView {

  }

  private interface GetAllJsonView {
  }

  private interface GetByIdJsonView {
  }
  private interface MeJsonView {
  }

  private interface SaveJsonView {
  }

  private interface UpdateJsonView {
  }

}
