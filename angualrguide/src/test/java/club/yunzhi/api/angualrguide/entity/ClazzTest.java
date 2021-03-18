package club.yunzhi.api.angualrguide.entity;

import club.yunzhi.api.angualrguide.repository.ClazzRepository;
import club.yunzhi.api.angualrguide.service.ClazzService;
import club.yunzhi.api.angualrguide.service.TeacherServiceImpl;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@SpringBootTest
@Transactional
class ClazzTest {
  @Autowired
  ClazzService clazzService;
  @Autowired
  ClazzRepository clazzRepository;
  @SpyBean
  TeacherServiceImpl teacherService;

  @Test
  void createTime() {
    Teacher currentLoginTeacher = this.teacherService.getOneSavedTeacher();
    Mockito.doReturn(Optional.of(currentLoginTeacher))
        .when(this.teacherService).getCurrentAuditor();

    Clazz clazz = this.clazzService.getOneSavedClazz();
    clazz = this.clazzRepository.findById(clazz.getId()).get();
    Assertions.assertNotNull(clazz.getCreateTime());
    Assertions.assertEquals(currentLoginTeacher.getId(), clazz.getCreateTeacher().getId());
  }

}