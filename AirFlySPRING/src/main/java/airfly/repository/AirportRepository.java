package airfly.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import model.Airport;


public interface AirportRepository extends JpaRepository<Airport, Integer> {
	
	@Query(value = "select * from airport", nativeQuery = true)
	List<Airport> findAllAirports();
	
}