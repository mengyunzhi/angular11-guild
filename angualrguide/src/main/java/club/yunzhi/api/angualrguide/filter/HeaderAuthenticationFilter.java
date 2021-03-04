package club.yunzhi.api.angualrguide.filter;

import club.yunzhi.api.angualrguide.config.MvcSecurityConfig;
import club.yunzhi.api.angualrguide.service.TeacherService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;

/**
 * header中x-auth认证
 */
@Component
public class HeaderAuthenticationFilter extends OncePerRequestFilter {
  private final TeacherService teacherService;

  public HeaderAuthenticationFilter(TeacherService teacherService) {
    this.teacherService = teacherService;
  }

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
    String authToken = request.getHeader(MvcSecurityConfig.xAuthTokenKey);
    if (authToken != null) {
      Optional<String> usernameOptional = this.teacherService.getUsernameByToken(authToken);
      if (usernameOptional.isPresent()) {
        // token有效，则设置登录信息
        PreAuthenticatedAuthenticationToken authentication = new PreAuthenticatedAuthenticationToken(usernameOptional.get(), null, new ArrayList<>());
        SecurityContextHolder.getContext().setAuthentication(authentication);
      } else {
        // 无效则清空token
        request = new HttpServletRequestAuthHeaderWrapper(request);
      }
    }
    filterChain.doFilter(request, response);
  }

  /**
   * 为清空x-auth-token准备的装饰器
   */
  private class HttpServletRequestAuthHeaderWrapper extends HttpServletRequestWrapper {

    /**
     * Constructs a request object wrapping the given request.
     *
     * @param request The request to wrap
     * @throws IllegalArgumentException if the request is null
     */
    public HttpServletRequestAuthHeaderWrapper(HttpServletRequest request) {
      super(request);
    }

    /**
     * 获取x-auth-token时，返回null
     *
     * @param name header名
     * @return
     */
    @Override
    public String getHeader(String name) {
      if (MvcSecurityConfig.xAuthTokenKey.equals(name)) {
        return null;
      }

      return super.getHeader(name);
    }

    /**
     * 获取x-auth-token时，返回空数组
     *
     * @param name header名称
     * @return
     */
    @Override
    public Enumeration<String> getHeaders(String name) {
      if (MvcSecurityConfig.xAuthTokenKey.equals(name)) {
        return new Enumeration<String>() {
          @Override
          public boolean hasMoreElements() {
            return false;
          }

          @Override
          public String nextElement() {
            return null;
          }
        };
      }

      return super.getHeaders(name);
    }
  }
}
