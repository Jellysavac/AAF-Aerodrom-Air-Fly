package airfly.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import model.Ticket;

public interface TicketRepository extends JpaRepository<Ticket, Integer>{
	
	
}
