package airfly.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import model.NumberOfAircraft;

public interface NumberOfAircraftRepository extends JpaRepository<NumberOfAircraft, Integer>{
	
	@Query(value = "SELECT * FROM ((number_of_aircraft AS na INNER JOIN company AS c ON c.id=na.company_id) INNER JOIN aircraft AS a ON a.id=na.aircraft_id) WHERE c.naziv=:naziv", nativeQuery = true)
	List<NumberOfAircraft> findNumberOfAircraft(@Param("naziv") String naziv);
}
