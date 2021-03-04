package club.yunzhi.api.angualrguide.controller;

import club.yunzhi.api.angualrguide.entity.Teacher;
import org.json.JSONObject;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.client.AutoConfigureWebClient;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.*;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.io.UnsupportedEncodingException;
import java.util.Base64;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Transactional
@AutoConfigureMockMvc
@AutoConfigureWebClient
class TeacherControllerTest {
  private String baseUrl = "/teacher";

  @Autowired
  MockMvc mockMvc;

  @LocalServerPort
  private int port;

  @Autowired
  RestTemplateBuilder restTemplateBuilder;

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

  @Test
  void login() throws UnsupportedEncodingException {
    String url = "http://localhost:" + port + "/teacher/login";
    RestTemplate restTemplate = this.restTemplateBuilder.build();
    HttpHeaders headers = this.getChromeHeaders();

    // 没有认证信息时401
    Assertions.assertThrows(HttpClientErrorException.class, () -> restTemplate.getForObject(url, JSONObject.class));
    try {
      HttpEntity entity = new HttpEntity(headers);
      restTemplate.exchange(url, HttpMethod.GET, entity, Teacher.class);
    } catch (HttpClientErrorException e) {
      Assertions.assertEquals(e.getStatusCode().value(), HttpStatus.UNAUTHORIZED.value());
    }

    // basic认证模式
    headers = this.getChromeHeaders();
    String auth = Base64.getEncoder().encodeToString("zhangsan:codedemo.club".getBytes("utf-8"));
    headers.add("Authorization", "Basic " + auth);
    HttpEntity entity = new HttpEntity(headers);
    ResponseEntity<Teacher> result = restTemplate.exchange(url, HttpMethod.GET, entity, Teacher.class);
    String xAuthToken = result.getHeaders().get("x-auth-token").get(0);
    Assertions.assertNotNull(xAuthToken);
    Teacher body = result.getBody();
    Assertions.assertEquals("zhangsan", body.getUsername());

    // x-auth-token认证
    headers = this.getChromeHeaders();
    headers.add("x-auth-token", xAuthToken);
    Teacher teacher = restTemplate.exchange(url, HttpMethod.GET, entity, Teacher.class).getBody();
    Assertions.assertEquals("zhangsan", teacher.getUsername());
  }

  private HttpHeaders getChromeHeaders() {
    HttpHeaders headers = new HttpHeaders();
    headers.add("Proxy-Connection", "keep-alive");
    headers.add("Pragma", "no-cache");
    headers.add("Cache-Control", "no-cache");
    headers.add("Accept", "application/json, text/plain, */*");
    headers.add("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.192 Safari/537.36");
    headers.add("Origin", "http://localhost:4200");
    headers.add("Referer", "http://localhost:4200/");
    headers.add("Accept-Encoding", "gzip, deflate");
    headers.add("Accept-Language", "en-GB,en;q=0.9,zh-CN;q=0.8,zh;q=0.7");
    return headers;
  }
}