package club.yunzhi.api.angualrguide.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
@AutoConfigureMockMvc
class TeacherControllerTest {
  private String baseUrl = "/teacher";

  @Autowired
  MockMvc mockMvc;

  @Test
  void getById() throws Exception {
    this.mockMvc.perform(MockMvcRequestBuilders.get(baseUrl + "/-2"))
        .andExpect(MockMvcResultMatchers.status().is(404))
        .andDo(MockMvcResultHandlers.print());
  }

  @Test
  void getAll() throws Exception {
    this.mockMvc.perform(MockMvcRequestBuilders.get(baseUrl))
        .andExpect(MockMvcResultMatchers.status().is(200))
        .andExpect(MockMvcResultMatchers.jsonPath("$[0].id").isNumber())
        .andExpect(MockMvcResultMatchers.jsonPath("$[0].username").isString())
        .andExpect(MockMvcResultMatchers.jsonPath("$[0].name").isString())
        .andExpect(MockMvcResultMatchers.jsonPath("$[0].email").isString())
        .andExpect(MockMvcResultMatchers.jsonPath("$[0].sex").isBoolean())
    ;
  }
}