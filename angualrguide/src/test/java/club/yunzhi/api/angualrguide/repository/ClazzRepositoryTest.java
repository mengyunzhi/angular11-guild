package club.yunzhi.api.angualrguide.repository;

import club.yunzhi.api.angualrguide.entity.Clazz;
import club.yunzhi.api.angualrguide.entity.Teacher;
import club.yunzhi.api.angualrguide.service.ClazzService;
import club.yunzhi.api.angualrguide.service.TeacherService;
import club.yunzhi.api.angualrguide.service.TeacherServiceImpl;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class ClazzRepositoryTest {
  Teacher teacher;
  @SpyBean
  TeacherServiceImpl teacherService;

  @Autowired
  ClazzService clazzService;

  @Autowired
  ClazzRepository clazzRepository;

  @Test
  void findAllByCreateTeacher() {
    this.teacher = this.teacherService.getOneSavedTeacher();
    Mockito.doReturn(Optional.of(this.teacher)).when(this.teacherService)
        .getCurrentAuditor();
    this.clazzService.getOneSavedClazz();

    // 以当前登录教师查询，1条记录
    Page<Clazz> clazzPage = this.clazzRepository.findAllByCreateTeacher(this.teacher, PageRequest.of(0, 10));
    Assertions.assertEquals(1, clazzPage.getTotalElements());

    // 以其它教师查询，0条记录
    Teacher teacher1 = this.teacherService.getOneSavedTeacher();
    clazzPage = this.clazzRepository.findAllByCreateTeacher(teacher1, PageRequest.of(0, 10));
    Assertions.assertEquals(0, clazzPage.getTotalElements());
  }
}