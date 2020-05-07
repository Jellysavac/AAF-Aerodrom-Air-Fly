package airfly.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import model.Ticket;

public interface TicketRepository extends JpaRepository<Ticket, Integer>{
	@Query(value="select * from ticket as t inner join flight as f on f.id=t.let_id where t.cena=100", nativeQuery = true)
	List<Ticket> findCheapestTickets();
	
	Ticket findById(int id);
	
	@Query(value = "SELECT * FROM ticket t WHERE t.let_id=:let_id AND t.klasa=:klasa", nativeQuery = true)
	Ticket findTicketByParams(@Param("let_id") int id, @Param("klasa") String klasa);
}
