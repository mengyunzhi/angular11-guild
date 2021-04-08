package club.yunzhi.api.angualrguide.controller;

import club.yunzhi.api.angualrguide.annotation.OwnerKey;
import club.yunzhi.api.angualrguide.annotation.OwnerSecured;
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

  @OwnerSecured(ClazzService.class)
  @JsonView(GetJsonView.class)
  @DeleteMapping("{id}")
  public void delete(@OwnerKey @PathVariable Long id) {
    this.clazzService.deleteById(id);
  }

  @OwnerSecured(ClazzService.class)
  @JsonView(GetJsonView.class)
  @GetMapping("{id}")
  public Clazz getById(@OwnerKey @PathVariable Long id) {
    return this.clazzService.getById(id);
  }

  @GetMapping("page")
  @JsonView(PageJsonView.class)
  public Page<Clazz> page(@PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
    return this.clazzService.pageOfCurrentTeacher(pageable);
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  @JsonView(SaveJsonView.class)
  public Clazz save(@RequestBody Clazz clazz) {
    return this.clazzService.save(clazz);
  }

  @PutMapping("{id}")
  @OwnerSecured(ClazzService.class)
  @JsonView(UpdateJsonView.class)
  public Clazz update(@OwnerKey @PathVariable Long id, @RequestBody Clazz clazz) {
    return this.clazzService.update(id, clazz);
  }

  private interface GetJsonView extends Clazz.TeacherJsonView {
  }

  private interface SaveJsonView extends Clazz.TeacherJsonView {
  }

  private interface PageJsonView extends Clazz.TeacherJsonView {
  }

  private interface UpdateJsonView extends Clazz.TeacherJsonView {
  }
}
