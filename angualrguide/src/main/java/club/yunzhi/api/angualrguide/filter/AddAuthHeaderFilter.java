package club.yunzhi.api.angualrguide.filter;

import club.yunzhi.api.angualrguide.config.MvcSecurityConfig;
import club.yunzhi.api.angualrguide.entity.Teacher;
import club.yunzhi.api.angualrguide.service.TeacherService;
import club.yunzhi.api.angualrguide.service.TeacherServiceImpl;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.*;
import javax.servlet.http.*;
import java.io.IOException;


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
   * 有X-auth-token，则验证是否有效，有效则更新有效期；无效则重新发放一个有效的。
   * 未获取到a-auth-token，则发放一个
   *
   * @param request     请求
   * @param response    响应
   * @param filterChain 过滤器链
   * @throws ServletException
   * @throws IOException
   */
  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
    // 如果用户是通过Basic认证过滤器认证的，则将认证的用户名与xAuthToken相绑定
    Authentication authResult = SecurityContextHolder.getContext().getAuthentication();
    if (authResult != null && authResult.isAuthenticated() && !(authResult instanceof PreAuthenticatedAuthenticationToken)) {
      String xAuthToken = request.getHeader(MvcSecurityConfig.xAuthTokenKey);
      if (xAuthToken == null) {
        throw new RuntimeException("未接收到xAuthToken，请在前置过滤器中加入有效的xAuthToken");
      }
      TeacherServiceImpl.UserDetail userDetail = (TeacherServiceImpl.UserDetail) authResult.getPrincipal();
      this.teacherService.bindAuthTokenLoginUsername(xAuthToken, userDetail.getTeacher(), true);
    }

    filterChain.doFilter(request, response);
  }
}
