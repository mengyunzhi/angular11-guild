package club.yunzhi.api.angualrguide.controller;

import club.yunzhi.api.angualrguide.annotation.OwnerKey;
import club.yunzhi.api.angualrguide.annotation.OwnerSecured;
import club.yunzhi.api.angualrguide.entity.Clazz;
import club.yunzhi.api.angualrguide.entity.Student;
import club.yunzhi.api.angualrguide.service.StudentService;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("student")
public class StudentController {

  private final StudentService studentService;

  public StudentController(StudentService studentService) {
    this.studentService = studentService;
  }

  @DeleteMapping("batchDeleteIds")
  public void batchDeleteIds(@RequestParam @OwnerKey List<Long> ids) {
    this.studentService.batchDeleteIds(ids);
  }

  @DeleteMapping("{id}")
  @OwnerSecured(StudentService.class)
  public void deleteById(@PathVariable @OwnerKey Long id) {
    this.studentService.deleteById(id);
  }

  @GetMapping("{id}")
  @OwnerSecured(StudentService.class)
  @JsonView(GetByIdJsonView.class)
  public Student getById(@PathVariable @OwnerKey Long id) {
    return this.studentService.getById(id);
  }

  @GetMapping("numberIsExist")
  public Boolean numberIsExist(@RequestParam String number) {
    return this.studentService.numberIsExist(number);
  }

  @GetMapping("pageOfCurrentTeacher")
  @JsonView(PageOfCurrentTeacherJsonView.class)
  public Page<Student> pageOfCurrentTeacher(@PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
    return this.studentService.pageOfCurrentTeacher(pageable);
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  @JsonView(SaveJsonView.class)
  public Student save(@RequestBody Student student) {
    return this.studentService.save(student);
  }

  @PutMapping("{id}")
  @OwnerSecured(StudentService.class)
  @JsonView(UpdateJsonView.class)
  public Student update(@PathVariable @OwnerKey Long id, @RequestBody Student student) {
    return this.studentService.update(id, student);
  }

  private interface PageOfCurrentTeacherJsonView extends Student.ClazzJsonView, Clazz.TeacherJsonView {
  }

  private interface SaveJsonView {
  }

  private interface UpdateJsonView extends Student.ClazzJsonView {
  }

  private interface GetByIdJsonView extends Student.ClazzJsonView {

  }
}
