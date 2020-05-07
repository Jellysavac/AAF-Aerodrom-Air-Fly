package airfly.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import airfly.dto.AddReservationRequestDto;
import airfly.dto.AddReservationResponseDto;
import airfly.repository.LetRepository;
import airfly.repository.ReservationRepository;
import airfly.repository.TicketRepository;
import airfly.repository.UserRepository;
import model.Flight;
import model.Reservation;
import model.Ticket;
import model.Userr;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("reservation")
public class ReservationController {
	
	@Autowired
	ReservationRepository rr;
	
	@Autowired
	TicketRepository tr;
	
	@Autowired
	UserRepository ur;
	
	@Autowired
	LetRepository lr;
	
	@PostMapping("/addReservation")
	ResponseEntity<?> addReservation(@Valid @RequestBody AddReservationRequestDto request){
		try {
			Reservation r = new Reservation();
			r.setBrojaKarata(request.getBrojKarata());
			Ticket t = tr.findById(request.getIdKarte());
			r.setTicket(t);
			Userr u = ur.findById(request.getIdKorisnika());
			r.setUserr(u);
			if(u.getBrojRezervacija()==4) {
				r.setCena(t.getCena()*r.getBrojaKarata()-(t.getCena()*r.getBrojaKarata()*5/100));
			}
			else {
				r.setCena(t.getCena()*r.getBrojaKarata());
			}
			rr.save(r);
			int brojRezervacija = ur.updateBrojRezervacija(request.getIdKorisnika());
			u.setBrojRezervacija(brojRezervacija);
			int brojMesta = lr.updateBrojMesta(request.getBrojKarata(), t.getFlight().getId());
			Flight f = new Flight();
			f.setBrojMesta(brojMesta);
			AddReservationResponseDto dto = new AddReservationResponseDto(r);
			return new ResponseEntity<AddReservationResponseDto>(dto, HttpStatus.OK);
		}catch(Exception e) {
			return new ResponseEntity<String>("Neuspesno dodavanje! "+e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}
}
