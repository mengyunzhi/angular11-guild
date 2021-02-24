package club.yunzhi.api.angualrguide.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
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
        .andExpect(MockMvcResultMatchers.status().is(404));
  }
}