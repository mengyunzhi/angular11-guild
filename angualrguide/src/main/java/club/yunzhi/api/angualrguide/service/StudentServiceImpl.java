package club.yunzhi.api.angualrguide.service;

import club.yunzhi.api.angualrguide.entity.Clazz;
import club.yunzhi.api.angualrguide.entity.Student;
import club.yunzhi.api.angualrguide.entity.Teacher;
import club.yunzhi.api.angualrguide.repository.StudentRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class StudentServiceImpl implements StudentService {
  private final StudentRepository studentRepository;
  private final TeacherService teacherService;
  private final ClazzService clazzService;

  public StudentServiceImpl(StudentRepository studentRepository, TeacherService teacherService, ClazzService clazzService) {
    this.studentRepository = studentRepository;
    this.teacherService = teacherService;
    this.clazzService = clazzService;
  }

  @Override
  public Page<Student> pageOfCurrentTeacher(Pageable pageable) {
    Teacher teacher = this.teacherService.getCurrentAuditor()
        .orElseThrow(() -> new AccessDeniedException("未获取到登录用户"));
    return this.studentRepository.findAllByClazzTeacher(teacher, pageable);
  }

  @Override
  public Student save(Student student) {
    Assert.notNull(student.getClazz(), "clazz不为能null");
    Student newStudent = new Student();
    newStudent.setName(student.getName());
    newStudent.setNumber(student.getNumber());
    newStudent.setEmail(student.getEmail());
    newStudent.setPhone(student.getPhone());
    Clazz clazz = this.clazzService.getById(student.getClazz().getId());
    Assert.notNull(clazz, "未获取到对应的clazz");
    Assert.isTrue(clazz.getTeacher().getId().equals(this.teacherService.getCurrentAuditor().get().getId()),
        "当前班级并不属于当前登录教师");
    newStudent.setClazz(clazz);
    return this.studentRepository.save(student);
  }

  @Override
  public Student update(Long id, Student student) {
    Student oldStudent = this.studentRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    oldStudent.setName(student.getName());
    oldStudent.setPhone(student.getPhone());
    oldStudent.setEmail(student.getEmail());
    oldStudent.setClazz(student.getClazz());
    return this.studentRepository.save(oldStudent);
  }

  @Override
  public void batchDeleteIds(List<Long> ids) {
    Stream<Student> students = ids.stream().map(id -> new Student(id));
    this.studentRepository.deleteAll(students.collect(Collectors.toList()));
  }

  @Override
  public void deleteById(Long id) {
    this.studentRepository.deleteById(id);
  }

  @Override
  public Student getById(Long id) {
    return this.studentRepository.findById(id).orElseThrow(EntityNotFoundException::new);
  }

  @Override
  public Boolean numberIsExist(String number) {
    return this.studentRepository.existsByNumber(number);
  }

  @Override
  public boolean checkAccess(Object key) {
    Assert.isTrue(key instanceof Long || key instanceof List, "key的类型必须是Long或List");
    if (key instanceof Long) {
      return this.checkAccess((Long) key);
    } else {
      List ids = (List) key;
      for (Object id : ids) {
        if (!this.checkAccess(id))
          return false;
      }
      return true;
    }
  }

  private boolean checkAccess(Long id) {
    Student student = this.studentRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    Teacher teacher = this.teacherService.getCurrentAuditor().orElseThrow(() -> new AccessDeniedException("匿名用户"));
    return student.getClazz().getTeacher().getId().equals(teacher.getId());
  }
}
