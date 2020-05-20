package airfly.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import model.Company;

public interface CompanyRepository extends JpaRepository<Company, Integer>{
	
	Company findByNaziv(String naziv);
	
	Company findById(int id);
	
	@Modifying
	@Transactional
	@Query(value = "UPDATE company c SET ocena=(ocena+:ocena)/2 WHERE c.naziv=:naziv", nativeQuery = true)
	int updateOcena(@Param("ocena") double ocena, @Param("naziv") String naziv);
}
