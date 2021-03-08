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
 * header中x-auth-token认证
 * 如果xAuthToken有效，则设置认证信息PreAuthenticatedAuthenticationToken
 */
@Component
public class HeaderAuthenticationFilter extends OncePerRequestFilter {
  private final TeacherService teacherService;

  public HeaderAuthenticationFilter(TeacherService teacherService) {
    this.teacherService = teacherService;
  }

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
    // 获取token，且token为已认证，则设置PreAuthenticatedAuthenticationToken，表明当前用户已认证
    String authToken = request.getHeader(MvcSecurityConfig.xAuthTokenKey);
    if (authToken == null) {
      authToken = UUID.randomUUID().toString();
      this.teacherService.bindAuthTokenLoginUsername(authToken, null, false);
    } else if (this.teacherService.isAuth(authToken)) {
      Optional<String> usernameOptional = this.teacherService.getUsernameByToken(authToken);
      if (usernameOptional.isPresent()) {
        // token有效，则设置登录信息
        PreAuthenticatedAuthenticationToken authentication = new PreAuthenticatedAuthenticationToken(usernameOptional.get(), null, new ArrayList<>());
        SecurityContextHolder.getContext().setAuthentication(authentication);
      }
    } else if (!this.teacherService.getUsernameByToken(authToken).isPresent()) {
      this.teacherService.bindAuthTokenLoginUsername(authToken, null, false);
    }

    response.setHeader(MvcSecurityConfig.xAuthTokenKey, authToken);

    filterChain.doFilter(new RequestWrapper(request, authToken), response);
  }

  private class RequestWrapper extends HttpServletRequestWrapper {
    private final String xAuthToken;

    /**
     * Constructs a request object wrapping the given request.
     *
     * @param request The request to wrap
     * @throws IllegalArgumentException if the request is null
     */
    public RequestWrapper(HttpServletRequest request, String xAuthToken) {
      super(request);
      this.xAuthToken = xAuthToken;
    }


    @Override
    public String getHeader(String name) {
      if ("x-auth-token".equals(name)) {
        return this.xAuthToken;
      }
      return super.getHeader(name);
    }
  }
}
