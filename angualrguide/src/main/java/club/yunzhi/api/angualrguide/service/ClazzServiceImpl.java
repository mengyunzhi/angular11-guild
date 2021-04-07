package club.yunzhi.api.angualrguide.service;

import club.yunzhi.api.angualrguide.entity.Clazz;
import club.yunzhi.api.angualrguide.entity.Teacher;
import club.yunzhi.api.angualrguide.repository.ClazzRepository;
import net.bytebuddy.utility.RandomString;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.Optional;

@Service
public class ClazzServiceImpl implements ClazzService {
  private final ClazzRepository clazzRepository;
  private final TeacherService teacherService;

  public ClazzServiceImpl(ClazzRepository clazzRepository, TeacherService teacherService) {
    this.clazzRepository = clazzRepository;
    this.teacherService = teacherService;
  }

  @Override
  public Clazz getOneSavedClazz() {
    Clazz clazz = this.getOneUnSavedClazz();
    this.clazzRepository.save(clazz);
    return clazz;
  }

  @Override
  public Clazz getOneUnSavedClazz() {
    Teacher teacher = this.teacherService.getOneSavedTeacher();
    Clazz clazz = new Clazz();
    clazz.setTeacher(teacher);
    clazz.setName(new RandomString().nextString());
    return clazz;
  }

  @Override
  public Page<Clazz> pageOfCurrentTeacher(Pageable pageable) {
    Teacher teacher = this.teacherService.getCurrentAuditor().get();
    return this.clazzRepository.findAllByCreateTeacher(teacher, pageable);
  }

  @Override
  public Clazz save(Clazz clazz) {
    return this.clazzRepository.save(clazz);
  }

  @Override
  public Clazz getById(Long id) {
    Optional<Clazz> clazzOptional = this.clazzRepository.findById(id);
    if (!clazzOptional.isPresent()) {
      throw new EntityNotFoundException();
    }

    return clazzOptional.get();
  }

  @Override
  public boolean checkAccess(Object key) {
    Long id = (Long) key;
    Teacher teacher = this.teacherService.getCurrentAuditor().get();
    Optional<Clazz> clazzOptional = this.clazzRepository.findById(id);
    if (clazzOptional.isPresent()
        && clazzOptional.get().getCreateTeacher().getId().equals(teacher.getId())) {
      return true;
    }
    return false;
  }
}
