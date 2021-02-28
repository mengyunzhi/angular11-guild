package club.yunzhi.api.angualrguide.advice;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.persistence.EntityExistsException;

@ControllerAdvice
public class AccessDeniedExceptionAdvice {
  @ResponseBody
  @ExceptionHandler(EntityExistsException.class)
  @ResponseStatus(value = HttpStatus.FORBIDDEN, reason = "您不拥有此权限")
  String handler(AccessDeniedException e) {
    return e.getMessage();
  }
}
