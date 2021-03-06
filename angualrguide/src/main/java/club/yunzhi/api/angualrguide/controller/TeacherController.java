package club.yunzhi.api.angualrguide.controller;

import club.yunzhi.api.angualrguide.config.MvcSecurityConfig;
import club.yunzhi.api.angualrguide.entity.Teacher;
import club.yunzhi.api.angualrguide.repository.TeacherRepository;
import club.yunzhi.api.angualrguide.service.TeacherService;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
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
  public void logout() {
    this.teacherService.logout();
  }

  @GetMapping("page")
  @JsonView(PageJsonView.class)
  public Page<Teacher> page(@PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
    return this.teacherRepository.findAll(pageable);
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
  public Teacher update(@PathVariable Long id, @RequestBody Teacher teacher, HttpServletRequest request) {
    Teacher oldTeacher = this.teacherRepository.findById(id).orElseThrow(() -> new NoSuchElementException());
    oldTeacher.setName(teacher.getName());
    oldTeacher.setEmail(teacher.getEmail());
    oldTeacher.setSex(teacher.getSex());
    oldTeacher.setUsername(teacher.getUsername());
    oldTeacher = this.teacherRepository.save(oldTeacher);
    return oldTeacher;
  }

  private interface LoginJsonView extends Teacher.UsernameJsonView {

  }

  private interface GetAllJsonView extends Teacher.UsernameJsonView{
  }

  private interface GetByIdJsonView extends Teacher.UsernameJsonView{
  }
  private interface MeJsonView extends Teacher.UsernameJsonView {
  }

  private interface PageJsonView extends Teacher.UsernameJsonView {
  }
  private interface SaveJsonView extends Teacher.UsernameJsonView{
  }

  private interface UpdateJsonView extends Teacher.UsernameJsonView{
  }

}
