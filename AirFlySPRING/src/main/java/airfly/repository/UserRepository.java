package airfly.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import model.Userr;

public interface UserRepository extends JpaRepository<Userr, Integer> {
	
	Optional<Userr> findByEmail(String email);
	
	@Query(value = "SELECT * FROM userr u WHERE u.email=:email AND u.lozinka=:lozinka", nativeQuery = true)
	Optional<Userr> findUserByEmailAndLozinka(@Param("email") String email, @Param("lozinka") String lozinka);
}
