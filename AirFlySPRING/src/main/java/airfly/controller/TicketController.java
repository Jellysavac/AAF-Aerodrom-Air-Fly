package airfly.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import airfly.dto.AddTicketRequestDto;
import airfly.dto.AddTicketResponseDto;
import airfly.repository.LetRepository;
import airfly.repository.TicketRepository;
import model.Flight;
import model.Ticket;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/ticket")
public class TicketController {
	
	@Autowired
	TicketRepository tr;
	
	@Autowired
	LetRepository lr;

	@PostMapping("/addTicket")
	ResponseEntity<?> addTicket(@RequestBody AddTicketRequestDto request){
		try {
			Ticket ticket = new Ticket();
			ticket.setKlasa(request.getKlasa());
			ticket.setCena(request.getCena());
			Flight flight = lr.findFlightById(request.getIdLeta());
			ticket.setFlight(flight);
			tr.save(ticket);
			AddTicketResponseDto dto = new AddTicketResponseDto(ticket);
			return new ResponseEntity<AddTicketResponseDto>(dto, HttpStatus.OK);
		}catch(Exception e) {
			return new ResponseEntity<String>("Neuspesno dodavanje nove karte! " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}
}
