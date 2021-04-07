package club.yunzhi.api.angualrguide.controller;

import club.yunzhi.api.angualrguide.entity.Clazz;
import club.yunzhi.api.angualrguide.service.ClazzService;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("clazz")
public class ClazzController {
  private final ClazzService clazzService;

  public ClazzController(ClazzService clazzService) {
    this.clazzService = clazzService;
  }

  public Page<Clazz> page(@PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
    return this.clazzService.pageOfCurrentTeacher(pageable);
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  @JsonView(SaveJsonView.class)
  public Clazz save(@RequestBody Clazz clazz) {
    return this.clazzService.save(clazz);
  }

  private interface SaveJsonView extends Clazz.TeacherJsonView {
  }
}
