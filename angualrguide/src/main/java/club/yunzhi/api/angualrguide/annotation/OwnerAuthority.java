package club.yunzhi.api.angualrguide.annotation;

/**
 * 拥有者权限认证.
 *
 * @author panjie
 */
public interface OwnerAuthority {
  /**
   * 校验权限.
   *
   * @param key 关键字
   * @return 通过 true
   */
  boolean checkAccess(Object key);
}
