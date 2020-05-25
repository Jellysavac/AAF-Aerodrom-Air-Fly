package airfly.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import model.Airport;

public interface AirportRepository extends JpaRepository<Airport, Integer> {
	
	@Query(value = "SELECT * FROM airport a INNER JOIN city c ON c.id=a.grad_id", nativeQuery = true)
	List<Airport> findAllAirports();
	
	@Query(value = "SELECT * FROM airport a WHERE a.id=:id", nativeQuery = true)
	Airport findAirportById(@Param("id") int id);
}