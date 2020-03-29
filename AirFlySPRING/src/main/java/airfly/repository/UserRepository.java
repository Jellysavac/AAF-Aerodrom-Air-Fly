package airfly.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import model.Userr;

public interface UserRepository extends JpaRepository<Userr, Integer> {
	
}
