package airfly.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import airfly.dto.AirportDto;
import airfly.dto.FlightsDto;
import airfly.repository.AirportRepository;
import airfly.repository.LetRepository;
import model.Airport;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/aerodrom")
public class AirportController {
	
	@Autowired
	AirportRepository ar;
	
	@GetMapping("/airports")
	ResponseEntity<List<AirportDto>> getAllAirports(){
		List<AirportDto> adto=new ArrayList<AirportDto>();
		List<Airport> aerodromi=ar.findAllAirports();
		for(Airport a : aerodromi) {
			AirportDto airport=new AirportDto(a);
			adto.add(airport);
		}
		return new ResponseEntity<List<AirportDto>>(adto, HttpStatus.OK);
	}

}