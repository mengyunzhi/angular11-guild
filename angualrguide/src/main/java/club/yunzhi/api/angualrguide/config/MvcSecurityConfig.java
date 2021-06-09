package club.yunzhi.api.angualrguide.config;

import club.yunzhi.api.angualrguide.entity.Teacher;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.session.MapSessionRepository;
import org.springframework.session.SessionRepository;
import org.springframework.session.config.annotation.web.http.EnableSpringHttpSession;
import org.springframework.session.web.http.HeaderHttpSessionStrategy;
import org.springframework.session.web.http.HttpSessionStrategy;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.concurrent.ConcurrentHashMap;

@Configuration
@EnableWebSecurity
@EnableSpringHttpSession
public class MvcSecurityConfig extends WebSecurityConfigurerAdapter {

  public MvcSecurityConfig() {
  }

  @Bean
  public SessionRepository sessionRepository() {
    SessionRepository mapSessionRepository = new MapSessionRepository();
    return mapSessionRepository;
  }

  /**
   * session认证方式为header认证
   *
   * @return Header认证策略
   */
  @Bean
  HttpSessionStrategy sessionStrategy() {
    return new HeaderHttpSessionStrategy();
  }

  /**
   * https://spring.io/guides/gs/securing-web/
   *
   * @param http http安全
   * @throws Exception 异常
   */
  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http
        .authorizeRequests()
        .antMatchers("/teacher/login").authenticated()
        .antMatchers("/teacher/me").authenticated()
        .antMatchers("/teacher/logout").authenticated()
        .antMatchers("/teacher/**").permitAll()
        .antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
        .anyRequest().authenticated()
        .and().cors()
        .and().httpBasic()
        .and().csrf().disable();
  }

  /**
   * CORS设置.
   * CORS出现错误时，请日志等级设置为debug查看具体原因
   *
   * @return 配置
   */
  @Bean
  CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(Arrays.asList("http://localhost:9876", "http://localhost:4200"));
    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE"));
    configuration.setAllowedHeaders(Arrays.asList("content-type", "x-auth-token", "authorization"));
    configuration.setExposedHeaders(Arrays.asList("x-auth-token"));
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
  }

  @Bean
  PasswordEncoder passwordEncoder() {
    PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    Teacher.setPasswordEncoder(passwordEncoder);
    return passwordEncoder;
  }

}
