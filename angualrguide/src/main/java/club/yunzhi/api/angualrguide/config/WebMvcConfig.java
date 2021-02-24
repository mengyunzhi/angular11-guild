package club.yunzhi.api.angualrguide.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@Configuration
@EnableWebMvc
public class WebMvcConfig implements WebMvcConfigurer {
  /**
   * 允许跨域
   */
  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**").allowedOrigins("*");
  }

  /**
   * 配置JsonView.
   *
   * @param converters 转换器
   */
  @Override
  public void configureMessageConverters(final List<HttpMessageConverter<?>> converters) {
    final ObjectMapper mapper = Jackson2ObjectMapperBuilder.json().defaultViewInclusion(true)
        .build();
    converters.add(new MappingJackson2HttpMessageConverter(mapper));
  }
}
