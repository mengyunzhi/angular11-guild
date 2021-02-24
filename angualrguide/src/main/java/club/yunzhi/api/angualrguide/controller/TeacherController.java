package club.yunzhi.api.angualrguide.controller;

import club.yunzhi.api.angualrguide.entity.Teacher;
import club.yunzhi.api.angualrguide.repository.TeacherRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("teacher")
public class TeacherController {
  private final TeacherRepository teacherRepository;

  public TeacherController(TeacherRepository teacherRepository) {
    this.teacherRepository = teacherRepository;
  }

  @GetMapping
  public List<Teacher> getAll() {
    return (List<Teacher>) this.teacherRepository.findAll();
  }

  @PostMapping
  public Teacher save(@RequestBody Teacher teacher) {
    return this.teacherRepository.save(teacher);
  }

  @GetMapping("{id}")
  public Teacher getById(@PathVariable Long id) {
    return this.teacherRepository.findById(id)
        .orElseThrow();
  }
}
