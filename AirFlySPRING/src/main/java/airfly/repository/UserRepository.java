package airfly.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import model.Userr;

public interface UserRepository extends JpaRepository<Userr, Integer> {
	
	Optional<Userr> findByEmail(String email);
}
