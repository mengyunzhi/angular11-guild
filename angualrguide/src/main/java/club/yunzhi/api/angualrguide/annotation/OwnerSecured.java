package club.yunzhi.api.angualrguide.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 拥有者权限认证.
 *
 * @author panjie
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface OwnerSecured {
  Class<? extends OwnerAuthority> value();
}
