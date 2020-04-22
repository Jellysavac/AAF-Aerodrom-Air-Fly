package airfly.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import airfly.dto.NumberOfAircraftDto;
import airfly.dto.NumberOfAircraftRequestDto;
import airfly.repository.NumberOfAircraftRepository;
import model.NumberOfAircraft;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("numberOfAircraft")
public class NumberOfAircraftController {

	@Autowired
	NumberOfAircraftRepository nar;
	
	@PostMapping("/getAircraftByCompany")
	ResponseEntity<List<NumberOfAircraftDto>> getAircraftByCompany(@RequestBody NumberOfAircraftRequestDto request){
		List<NumberOfAircraftDto> dto = new ArrayList<NumberOfAircraftDto>();
		List<NumberOfAircraft> aircrafts = nar.findNumberOfAircraft(request.getNaziv());
		for(NumberOfAircraft na : aircrafts) {
			NumberOfAircraftDto nadto = new NumberOfAircraftDto(na);
			dto.add(nadto);
		}
		return new ResponseEntity<List<NumberOfAircraftDto>>(dto, HttpStatus.OK);
	}
}
