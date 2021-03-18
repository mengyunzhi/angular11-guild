package club.yunzhi.api.angualrguide.entity;

import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.sql.Timestamp;

/**
 * 班级
 */
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Clazz {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String name;

  @ManyToOne
  @JoinColumn(nullable = false)
  @JsonView(TeacherJsonView.class)
  private Teacher teacher;

  @CreatedDate
  private Timestamp createTime;

  @CreatedBy
  @ManyToOne
  @JsonView(CreateTeacherJsonView.class)
  private Teacher createTeacher;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Teacher getTeacher() {
    return teacher;
  }

  public void setTeacher(Teacher teacher) {
    this.teacher = teacher;
  }

  public Timestamp getCreateTime() {
    return createTime;
  }

  protected void setCreateTime(Timestamp createTime) {
    this.createTime = createTime;
  }

  public Teacher getCreateTeacher() {
    return createTeacher;
  }

  protected void setCreateTeacher(Teacher createTeacher) {
    this.createTeacher = createTeacher;
  }

  public interface TeacherJsonView {
  }

  public interface CreateTeacherJsonView {
  }
}
