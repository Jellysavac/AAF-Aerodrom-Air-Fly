package airfly.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import model.Company;
import model.Flight;

public interface CompanyRepository extends JpaRepository<Company, Integer>{
	
	Company findByNaziv(String naziv);
	
	Company findById(int id);
	
	@Modifying
	@Transactional
	@Query(value = "UPDATE company c SET ocena=(ocena+:ocena)/2 WHERE c.naziv=:naziv", nativeQuery = true)
	int updateOcena(@Param("ocena") double ocena, @Param("naziv") String naziv);
	
	@Query(value = "SELECT * FROM company c WHERE c.ocena>=3.5 ORDER BY c.ocena DESC", nativeQuery = true)
	List<Company> findBestCompanies();
	
	@Query(value = "SELECT * FROM company c WHERE c.id=:id", nativeQuery = true)
	Company findCompanyById(@Param("id") int id);
}
