package club.yunzhi.api.angualrguide.controller;


import club.yunzhi.api.angualrguide.entity.Clazz;
import club.yunzhi.api.angualrguide.entity.Teacher;
import club.yunzhi.api.angualrguide.service.ClazzService;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;
import net.bytebuddy.utility.RandomString;
import org.apache.tomcat.util.json.JSONParser;
import org.json.JSONObject;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import sun.misc.CharacterEncoder;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

class ClazzControllerTest extends ControllerTest {
  @Autowired
  MockMvc mockMvc;

  private String url = "/clazz";

  @MockBean
  ClazzService clazzService;

  public static Clazz getOneClazz() {
    Clazz clazz = new Clazz();
    clazz.setId(new Random().nextLong());
    clazz.setName(RandomString.make(4));
    clazz.setTeacher(TeacherControllerTest.getOneTeacher());
    return clazz;
  }

  @Test
  void get() throws Exception {
    Clazz clazz = ClazzControllerTest.getOneClazz();
    long id = new Random().nextLong();
    Mockito.doReturn(true).when(this.clazzService).checkAccess(Mockito.any());
    Mockito.doReturn(clazz).when(this.clazzService).getById(id);

    this.mockMvc.perform(MockMvcRequestBuilders.get(this.url + "/" + id)
        .contentType(MediaType.APPLICATION_JSON))
        .andExpect(MockMvcResultMatchers.status().isOk())
        .andExpect(MockMvcResultMatchers.jsonPath("id").isNumber())
        .andExpect(MockMvcResultMatchers.jsonPath("name").isString())
        .andExpect(MockMvcResultMatchers.jsonPath("teacher.id").isNumber())
        .andExpect(MockMvcResultMatchers.jsonPath("teacher.name").isString())
    ;

    ArgumentCaptor<Long> longArgumentCaptor = ArgumentCaptor.forClass(Long.class);
    Mockito.verify(this.clazzService).getById(longArgumentCaptor.capture());
    Assertions.assertEquals(id, longArgumentCaptor.getValue());
  }

  @Test
  void page() throws Exception {
    List<Clazz> clazzes = new ArrayList<>();
    for (int i = 0; i < 10; i++) {
      clazzes.add(ClazzControllerTest.getOneClazz());
    }

    Page<Clazz> clazzPage = new PageImpl<Clazz>(clazzes, PageRequest.of(0, 20), 200);
    Mockito.doReturn(clazzPage).when(this.clazzService).pageOfCurrentTeacher(Mockito.any(Pageable.class));

    this.mockMvc.perform(MockMvcRequestBuilders.get(this.url + "/page")
        .contentType(MediaType.APPLICATION_JSON)
        .param("page", "0")
        .param("size", "10"))
        .andExpect(MockMvcResultMatchers.status().isOk())
        .andExpect(MockMvcResultMatchers.jsonPath(".content[0].id").isNumber())
        .andExpect(MockMvcResultMatchers.jsonPath(".content[0].name").isString())
        .andExpect(MockMvcResultMatchers.jsonPath(".content[0].teacher.id").isNumber())
        .andExpect(MockMvcResultMatchers.jsonPath(".content[0].teacher.name").isString())
    ;

    ArgumentCaptor<Pageable> pageableArgumentCaptor = ArgumentCaptor.forClass(Pageable.class);
    Mockito.verify(this.clazzService).pageOfCurrentTeacher(pageableArgumentCaptor.capture());
    Assertions.assertEquals(10, pageableArgumentCaptor.getValue().getPageSize());
    Assertions.assertEquals(0, pageableArgumentCaptor.getValue().getPageNumber());
  }


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

  @Test
  void update() throws Exception {
    Clazz resultClazz = ClazzControllerTest.getOneClazz();
    long id = new Random().nextLong();
    Mockito.doReturn(resultClazz).when(this.clazzService).update(Mockito.anyLong(), Mockito.any(Clazz.class));

    Clazz clazz = new Clazz();
    clazz.setName(RandomString.make(6));
    clazz.setTeacher(new Teacher());
    clazz.getTeacher().setId(new Random().nextLong());

    this.mockMvc.perform(MockMvcRequestBuilders.put(this.url + "/" + id)
        .contentType(MediaType.APPLICATION_JSON)
        .characterEncoding("utf-8")
        .content(new ObjectMapper().setSerializationInclusion(JsonInclude.Include.NON_NULL).writeValueAsString(clazz)))
        .andExpect(MockMvcResultMatchers.status().isOk())
        .andExpect(MockMvcResultMatchers.jsonPath("id").isNumber())
        .andExpect(MockMvcResultMatchers.jsonPath("name").isString())
        .andExpect(MockMvcResultMatchers.jsonPath("teacher.id").isNumber())
        .andExpect(MockMvcResultMatchers.jsonPath("teacher.name").isString())
    ;

    ArgumentCaptor<Long> longArgumentCaptor = ArgumentCaptor.forClass(Long.class);
    ArgumentCaptor<Clazz> clazzArgumentCaptor = ArgumentCaptor.forClass(Clazz.class);
    Mockito.verify(this.clazzService).update(longArgumentCaptor.capture(), clazzArgumentCaptor.capture());
    Assertions.assertEquals(id, longArgumentCaptor.getValue());
    Assertions.assertEquals(clazz.getName(), clazzArgumentCaptor.getValue().getName());
    Assertions.assertEquals(clazz.getTeacher().getId(), clazzArgumentCaptor.getValue().getTeacher().getId());
  }
}