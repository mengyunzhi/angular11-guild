package club.yunzhi.api.angualrguide.aspect;

import club.yunzhi.api.angualrguide.annotation.OwnerAuthority;
import club.yunzhi.api.angualrguide.annotation.OwnerKey;
import club.yunzhi.api.angualrguide.annotation.OwnerSecured;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Component;

import java.lang.annotation.Annotation;

/**
 * 资源权限校验.
 *
 * @author panjie
 */
@Aspect
@Component
public class OwnerSecuredAspect {
  private Logger logger = LoggerFactory.getLogger(this.getClass());

  private final ApplicationContext applicationContext;

  public OwnerSecuredAspect(ApplicationContext applicationContext) {
    this.applicationContext = applicationContext;
  }

  /**
   * 切入点.
   *
   * @param ownerSecured 注解
   */
  @Pointcut("@annotation(club.yunzhi.api.angualrguide.annotation.OwnerSecured) "
      + "&& @annotation(ownerSecured)")
  public void annotationPointCut(OwnerSecured ownerSecured) {
  }

  /**
   * 在切点前执行，权限不通过报403.
   *
   * @param joinPoint    切点
   * @param ownerSecured 拥有者权限注解
   */
  @Before("annotationPointCut(ownerSecured)")
  public void before(JoinPoint joinPoint, OwnerSecured ownerSecured) {
    Object paramKey = this.getOwnerKeyValueFromMethodParam(joinPoint);
    try {
      OwnerAuthority ownerAuthority = applicationContext.getBean(ownerSecured.value());
      if (!ownerAuthority.checkAccess(paramKey)) {
        throw new AccessDeniedException("您无权对该资源进行操作");
      }
    } catch (BeansException beansException) {
      logger.error("未获取到类型" + ownerSecured.value().toString() + "的bean，请添加");
      beansException.printStackTrace();
    }
  }

  /**
   * 获取在参数中使用@OwnerKey注解的值.
   *
   * @param joinPoint 切点
   * @return 参数值
   */
  private Object getOwnerKeyValueFromMethodParam(JoinPoint joinPoint) {
    Object result = null;
    boolean found = false;
    Object[] methodArgs = joinPoint.getArgs();
    int numArgs = methodArgs.length;
    MethodSignature methodSignature = (MethodSignature) joinPoint.getSignature();
    Annotation[][] annotationMatrix = methodSignature.getMethod().getParameterAnnotations();
    for (int i = 0; i < numArgs; i++) {
      Annotation[] annotations = annotationMatrix[i];
      for (Annotation annotation : annotations) {
        if (annotation.annotationType().equals(OwnerKey.class)) {
          if (!found) {
            result = methodArgs[i];
            found = true;
          } else {
            this.logger.warn("找到多个OwnerKey注解，将以首个OwnerKey注解为主，非首注解将被忽略");
          }
        }
      }
    }

    if (result != null) {
      return result;
    } else {
      throw new RuntimeException("未在方法中找到OwnerKey注解，无法标识其关键字");
    }
  }
}
