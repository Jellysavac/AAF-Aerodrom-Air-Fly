package airfly.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import model.Flight;

public interface LetRepository extends JpaRepository<Flight, Integer> {
	
	@Query(value = "SELECT * FROM (((flight as f INNER JOIN airport as a1 on a1.id=f.polazni_aerodrom_id) INNER JOIN airport as a2 on a2.id=f.dolazni_aerodrom_id) INNER JOIN company as c on c.id=f.company_id) GROUP BY f.id", nativeQuery = true)
	List<Flight> findAllFlights();
	
	@Query(value = "SELECT * FROM (((flight as f INNER JOIN airport as a1 on a1.id=f.polazni_aerodrom_id) INNER JOIN airport as a2 on a2.id=f.dolazni_aerodrom_id) INNER JOIN company as c on c.id=f.company_id) WHERE a1.naziv=:polazniAerodrom AND a2.naziv=:dolazniAerodrom AND f.datum=:datum", nativeQuery = true)
	List<Flight> getFlightsByParams(@Param("polazniAerodrom") String polazniAerodrom, @Param("dolazniAerodrom") String dolazniAerodrom, @Param("datum") String datum);
	
	@Query(value = "SELECT * FROM flight f WHERE f.id=:id", nativeQuery = true)
	Flight findFlightById(@Param("id") int id);
	
	@Modifying
	@Transactional
	@Query(value = "UPDATE flight f SET broj_mesta=broj_mesta-:brojKarata WHERE f.id=:id", nativeQuery = true)
	int updateBrojMesta(@Param("brojKarata") int brojKarata, @Param("id") int id);
	
	@Query(value = "SELECT * FROM (((flight as f INNER JOIN airport as a1 on a1.id=f.polazni_aerodrom_id) INNER JOIN airport as a2 on a2.id=f.dolazni_aerodrom_id) INNER JOIN company as c on c.id=f.company_id) WHERE a1.naziv=:polazniAerodrom AND a2.naziv=:dolazniAerodrom AND f.datum=:datum AND f.broj_mesta>=:putnici", nativeQuery = true)
	List<Flight> getFlightsByParamsForReservation(@Param("polazniAerodrom") String polazniAerodrom, @Param("dolazniAerodrom") String dolazniAerodrom, @Param("datum") String datum, @Param("putnici") int brojPutnika);
}