package club.yunzhi.api.angualrguide.service;

import club.yunzhi.api.angualrguide.entity.Clazz;
import club.yunzhi.api.angualrguide.entity.Teacher;
import club.yunzhi.api.angualrguide.repository.ClazzRepository;
import net.bytebuddy.utility.RandomString;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
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
  public List<Clazz> allOfCurrentTeacher() {
    Teacher teacher = this.teacherService.getCurrentAuditor()
        .orElseThrow(() -> new AccessDeniedException("匿名用户"));
    Pageable pageable = PageRequest.of(0, 100000);
    return this.clazzRepository.findAllByCreateTeacher(teacher, pageable).getContent();
  }

  @Override
  public void deleteById(Long id) {
    this.clazzRepository.deleteById(id);
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
  public Clazz update(Long id, Clazz clazz) {
    Clazz oldClazz = this.clazzRepository.findById(id).orElseThrow(() -> new EntityNotFoundException());
    oldClazz.setName(clazz.getName());
    oldClazz.setTeacher(clazz.getTeacher());
    return this.clazzRepository.save(oldClazz);
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
