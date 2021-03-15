package club.yunzhi.api.angualrguide.config;

import club.yunzhi.api.angualrguide.filter.AddAuthHeaderFilter;
import club.yunzhi.api.angualrguide.entity.Teacher;
import club.yunzhi.api.angualrguide.filter.HeaderAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class MvcSecurityConfig extends WebSecurityConfigurerAdapter {
  private final AddAuthHeaderFilter addAuthHeaderFilter;
  private final HeaderAuthenticationFilter headerAuthenticationFilter;
  public static String xAuthTokenKey = "x-auth-token";

  public MvcSecurityConfig(AddAuthHeaderFilter addAuthHeaderFilter, HeaderAuthenticationFilter headerAuthenticationFilter) {
    this.addAuthHeaderFilter = addAuthHeaderFilter;
    this.headerAuthenticationFilter = headerAuthenticationFilter;
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
        .and().cors()
        .and().httpBasic()
        .and().csrf().disable()
        .addFilterBefore(this.headerAuthenticationFilter, BasicAuthenticationFilter.class)
        .addFilterAfter(this.addAuthHeaderFilter, BasicAuthenticationFilter.class);
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
