package airfly.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import model.Userr;

public interface UserRepository extends JpaRepository<Userr, Integer> {
	
	Optional<Userr> findByEmail(String email);
	
	@Query(value = "SELECT * FROM userr u WHERE u.email=:email AND u.lozinka=:lozinka", nativeQuery = true)
	Optional<Userr> findUserByEmailAndLozinka(@Param("email") String email, @Param("lozinka") String lozinka);
	
	Userr findById(int id);
	
	@Modifying
	@Transactional
	@Query(value = "UPDATE userr u SET broj_rezervacija=broj_rezervacija+1 WHERE u.id=:id", nativeQuery = true)
	int updateBrojRezervacija(@Param("id") int id);
}
