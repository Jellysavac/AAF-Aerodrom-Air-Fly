package airfly.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

import airfly.dto.getFlightsDto;
import airfly.repository.LetRepository;
import model.Flight;

public class LetController {
	
	LetRepository lr;
	
	@GetMapping("/getAllFlights")
	ResponseEntity<List<getFlightsDto>> getAllFlights(){
		List<getFlightsDto> gdto=new ArrayList<getFlightsDto>();
		List<Flight> letovi=lr.findAll();
		for(Flight f: letovi) {
			getFlightsDto let=new getFlightsDto(f);
			gdto.add(let);
		}
		return new ResponseEntity<List<getFlightsDto>>(gdto, HttpStatus.OK);
	}

}