package club.yunzhi.api.angualrguide.filter;

import club.yunzhi.api.angualrguide.config.MvcSecurityConfig;
import club.yunzhi.api.angualrguide.service.TeacherService;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.*;
import javax.servlet.http.*;
import java.io.IOException;
import java.util.UUID;


/**
 * 添加响应header中的token信息
 */
@Component
public class AddAuthHeaderFilter extends OncePerRequestFilter {
  private final TeacherService teacherService;

  public AddAuthHeaderFilter(TeacherService teacherService) {
    this.teacherService = teacherService;
  }

  /**
   * 用户名密码认证成功的情况下，没有获取到请求Header，则生成一个随机的；请求到了，就用请求带的
   * @param request
   * @param response
   * @param filterChain
   * @throws ServletException
   * @throws IOException
   */
  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
    Authentication authResult = SecurityContextHolder.getContext().getAuthentication();
    if (authResult != null
        && authResult.isAuthenticated()) {
      String xAuthToken = request.getHeader(MvcSecurityConfig.xAuthTokenKey);
      if (null == xAuthToken) {
        xAuthToken = UUID.randomUUID().toString();
        this.teacherService.bindLoginUser(xAuthToken, authResult.getName());
      }
      response.setHeader(MvcSecurityConfig.xAuthTokenKey, xAuthToken);
    }
    filterChain.doFilter(request, response);
  }
}
