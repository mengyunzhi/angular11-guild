package club.yunzhi.api.angualrguide.controller;

import club.yunzhi.api.angualrguide.entity.Teacher;
import club.yunzhi.api.angualrguide.repository.TeacherRepository;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityExistsException;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("teacher")
public class TeacherController {
  private final TeacherRepository teacherRepository;

  public TeacherController(TeacherRepository teacherRepository) {
    this.teacherRepository = teacherRepository;
  }

  @DeleteMapping("{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deleteById(@PathVariable Long id) {
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

  private interface GetAllJsonView {
  }

  private interface GetByIdJsonView {
  }

  private interface SaveJsonView {
  }

  private interface UpdateJsonView {
  }

}
