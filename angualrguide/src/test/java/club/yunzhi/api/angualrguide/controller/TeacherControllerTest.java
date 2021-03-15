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
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;

import java.io.UnsupportedEncodingException;
import java.util.Base64;
import java.util.UUID;

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

  @Test
  void xAuthToken() throws UnsupportedEncodingException {
    // 第一次请求，获取x-auth-token
    String loginUrl = "http://localhost:" + port + "/teacher/login";
    String logoutUrl = "http://localhost:" + port + "/teacher/logout";
    RestTemplate restTemplate = this.restTemplateBuilder.build();
    HttpHeaders headers = this.getChromeHeaders();
    HttpEntity entity = new HttpEntity(headers);
    String xAuthToken = null;
    try {
      restTemplate.exchange(loginUrl, HttpMethod.GET, entity, Teacher.class);
    } catch (HttpStatusCodeException exception) {
      HttpHeaders headers1 = exception.getResponseHeaders();
      xAuthToken = headers1.getFirst("x-auth-token");
    }
    Assertions.assertNotNull(xAuthToken);

    // 第二次请求，携带第一次的token，响应的token不变
    headers.add("x-auth-token", xAuthToken);
    String responseToken = null;
    try {
      restTemplate.exchange(loginUrl, HttpMethod.GET, entity, Teacher.class);
    } catch (HttpStatusCodeException exception) {
      HttpHeaders headers1 = exception.getResponseHeaders();
      responseToken = headers1.getFirst("x-auth-token");
    }
    Assertions.assertNotNull(xAuthToken, responseToken);

    // 第三次请求，加入登录信息
    String auth = Base64.getEncoder().encodeToString("zhangsan:codedemo.club".getBytes("utf-8"));
    headers.add("Authorization", "Basic " + auth);
    restTemplate.exchange(loginUrl, HttpMethod.GET, entity, Teacher.class);

    // 第四次请求，去除登录信息，直接使用token，请求成功
    headers.remove("Authorization");
    restTemplate.exchange(loginUrl, HttpMethod.GET, entity, Teacher.class);

    // 注销后再次请求，失败
    restTemplate.exchange(logoutUrl, HttpMethod.GET, entity, Object.class);
    Assertions.assertThrows(HttpStatusCodeException.class, () ->
        restTemplate.exchange(logoutUrl, HttpMethod.GET, entity, Teacher.class));

    // 第五次，随便写个token
    headers.remove("x-auth-token");
    headers.add("x-auth-token", UUID.randomUUID().toString());
    Assertions.assertThrows(HttpStatusCodeException.class, () ->
        restTemplate.exchange(loginUrl, HttpMethod.GET, entity, Teacher.class));
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