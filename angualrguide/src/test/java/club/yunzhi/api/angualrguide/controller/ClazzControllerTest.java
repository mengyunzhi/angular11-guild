package club.yunzhi.api.angualrguide.controller;


import club.yunzhi.api.angualrguide.entity.Clazz;
import club.yunzhi.api.angualrguide.entity.Teacher;
import club.yunzhi.api.angualrguide.service.ClazzService;
import net.bytebuddy.utility.RandomString;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.Random;


@SpringBootTest
@AutoConfigureMockMvc
class ClazzControllerTest {
  @Autowired
  MockMvc mockMvc;
  private String url = "/clazz";

  @MockBean
  ClazzService clazzService;

  @Test
  void save() throws Exception {
    Clazz clazz = new Clazz();
    clazz.setName(RandomString.make(4));
    clazz.setId(new Random().nextLong());
    Teacher teacher = new Teacher();
    clazz.setTeacher(teacher);
    teacher.setId(new Random().nextLong());
    teacher.setName(RandomString.make(4));

    Mockito.doReturn(clazz).when(this.clazzService).save(Mockito.any(Clazz.class));

    this.mockMvc.perform(MockMvcRequestBuilders.post(this.url)
        .contentType(MediaType.APPLICATION_JSON)
        .content("{}"))
        .andExpect(MockMvcResultMatchers.status().is(201))
        .andExpect(MockMvcResultMatchers.jsonPath("id").isNumber())
        .andExpect(MockMvcResultMatchers.jsonPath("name").isString())
        .andExpect(MockMvcResultMatchers.jsonPath("teacher.id").isNumber())
        .andExpect(MockMvcResultMatchers.jsonPath("teacher.name").isString())
        ;
  }
}