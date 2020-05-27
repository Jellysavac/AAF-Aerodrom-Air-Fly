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

import airfly.dto.AddFlightRequestDto;
import airfly.dto.AddFlightResponseDto;
import airfly.dto.FlightForReservationRequsetDto;
import airfly.dto.FlightForReservationResponseDto;
import airfly.dto.FlightsDto;
import airfly.dto.FlightsRequestDto;
import airfly.repository.AirportRepository;
import airfly.repository.CompanyRepository;
import airfly.repository.LetRepository;
import model.Airport;
import model.Company;
import model.Flight;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/let")
public class LetController {
	
	@Autowired
	LetRepository lr;
	
	@Autowired
	AirportRepository ar;
	
	@Autowired
	CompanyRepository cr;
	
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
	
	@PostMapping("/getAllFlightsForReservation")
	ResponseEntity<?> getAllFlightsForReservation(@RequestBody FlightForReservationRequsetDto request){
		try {
			List<FlightForReservationResponseDto> fdto = new ArrayList<FlightForReservationResponseDto>();
			List<Flight> flights = lr.getFlightsByParamsForReservation(request.getPolazniAerodrom(), request.getDolazniAerodrom(), request.getDatum(), request.getBrojPutnika());
			for(Flight f : flights) {
				FlightForReservationResponseDto dto = new FlightForReservationResponseDto(f);
				fdto.add(dto);
		}
		return new ResponseEntity<List<FlightForReservationResponseDto>>(fdto, HttpStatus.OK);
		}catch(Exception e) {
			return new ResponseEntity<String>("Nema letova "+e.getMessage(), HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/addFlight")
	ResponseEntity<?> addFlight(@RequestBody AddFlightRequestDto request){
		try {
			Flight flight = new Flight();
			flight.setVrsta(request.getType());
			flight.setDatum(request.getDate());
			flight.setBrojMesta(request.getSeats());
			Airport departure = ar.findAirportById(request.getDepartureId());
			flight.setAirport1(departure);
			Airport arrival = ar.findAirportById(request.getArrivalId());
			flight.setAirport2(arrival);
			Company company = cr.findById(request.getCompanyId());
			flight.setCompany(company);
			lr.save(flight);
			AddFlightResponseDto dto = new AddFlightResponseDto(flight);
			return new ResponseEntity<AddFlightResponseDto>(dto, HttpStatus.OK);
		}catch(Exception e) {
			return new ResponseEntity<String>("Neuspesno dodavanje novog leta! " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}
}