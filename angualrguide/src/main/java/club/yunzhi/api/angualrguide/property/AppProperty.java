package club.yunzhi.api.angualrguide.property;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@ConfigurationProperties(prefix = "app")
@Component
public class AppProperty {
  private final Logger logger = LoggerFactory.getLogger(this.getClass());
  private List<String> origins = new ArrayList<>();

  public AppProperty() {
  }

  public List<String> getOrigins() {
    return origins;
  }

  public void setOrigins(List<String> origins) {
    this.origins = origins;
  }
}
