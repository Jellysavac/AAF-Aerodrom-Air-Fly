package airfly.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import model.Flight;

public interface LetRepository extends JpaRepository<Flight, Integer> {
	
	@Query(value = "SELECT * FROM (((flight as f INNER JOIN airport as a1 on a1.id=f.polazni_aerodrom_id) INNER JOIN airport as a2 on a2.id=f.dolazni_aerodrom_id) INNER JOIN company as c on c.id=f.company_id)", nativeQuery = true)
	List<Flight> findAllFlights();
	
}