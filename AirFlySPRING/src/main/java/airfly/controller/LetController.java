package airfly.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import airfly.dto.FlightsDto;
import airfly.dto.FlightsRequestDto;
import airfly.repository.LetRepository;
import model.Flight;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/let")
public class LetController {
	
	@Autowired
	LetRepository lr;
	
	@GetMapping("/getAllFlights")
	ResponseEntity<List<FlightsDto>> getAllFlights(){
		List<FlightsDto> gdto=new ArrayList<FlightsDto>();
		List<Flight> letovi=lr.findAllFlights();
		for(Flight f : letovi) {
			FlightsDto let=new FlightsDto(f);
			gdto.add(let);
		}
		return new ResponseEntity<List<FlightsDto>>(gdto, HttpStatus.OK);
	}
	
	@PostMapping("/getAllFlightsByParams")
	ResponseEntity<?> getAllFlightsByParams(@RequestBody FlightsRequestDto request){
		try {
			List<FlightsDto> fdto = new ArrayList<FlightsDto>();
			List<Flight> flights = lr.getFlightsByParams(request.getPolazniAerodrom(), request.getDolazniAerodrom(), request.getDatum());
			for(Flight f : flights) {
				FlightsDto dto = new FlightsDto(f);
				fdto.add(dto);
			}
			return new ResponseEntity<List<FlightsDto>>(fdto, HttpStatus.OK);
		}catch(Exception e) {
			return new ResponseEntity<String>("Nema letova "+e.getMessage(), HttpStatus.NOT_FOUND);
		}
	}
}