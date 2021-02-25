package club.yunzhi.api.angualrguide.entity;

import club.yunzhi.api.angualrguide.repository.TeacherRepository;
import net.bytebuddy.utility.RandomString;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.dao.DataIntegrityViolationException;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class TeacherTest {
    @Autowired
    TeacherRepository teacherRepository;

    @Test
    void uniqueUsername() {
        String username = new RandomString().nextString();
        Teacher teacher = new Teacher();
        teacher.setUsername(username);
        teacherRepository.save(teacher);
        Teacher teacher1 = new Teacher();
        teacher1.setUsername(username);
        assertThrows(DataIntegrityViolationException.class,
                () -> teacherRepository.save(teacher1));
    }

}