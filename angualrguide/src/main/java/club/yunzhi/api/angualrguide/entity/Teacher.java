package club.yunzhi.api.angualrguide.entity;

import com.fasterxml.jackson.annotation.JsonView;

import javax.persistence.*;

@Entity
@Table(indexes = {
        @Index(name = "teacher_username", columnList = "username", unique = true),
        @Index(name = "teacher_email", columnList = "email", unique = true),
})
public class Teacher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;

    private String name;

    @JsonView(PasswordJsonView.class)
    private String password;

    private Boolean sex = true;

    @Column(nullable = false)
    private String username;

    public Teacher() {
    }

    public Teacher(String name, String username, String email, boolean sex) {
        this.setName(name);
        this.setUsername(username);
        this.setEmail(email);
        this.setSex(sex);
    }

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

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Boolean getSex() {
        return sex;
    }

    public void setSex(Boolean sex) {
        this.sex = sex;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public interface PasswordJsonView {
    }
}
