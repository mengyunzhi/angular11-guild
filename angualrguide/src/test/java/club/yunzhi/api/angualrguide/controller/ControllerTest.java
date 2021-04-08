package club.yunzhi.api.angualrguide.controller;

import club.yunzhi.api.angualrguide.aspect.OwnerSecuredAspect;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.Mockito;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.SpyBean;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
@Transactional
public abstract class ControllerTest {
  @SpyBean
  OwnerSecuredAspect ownerSecuredAspect;

  @BeforeEach
  protected void beforeEach() {
    Mockito.doNothing().when(this.ownerSecuredAspect).before(
        Mockito.any(), Mockito.any());
  }
}
