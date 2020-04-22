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

import airfly.dto.CompanyDto;
import airfly.dto.GetCompanyByNameRequestDto;
import airfly.repository.CompanyRepository;
import airfly.repository.NumberOfAircraftRepository;
import model.Company;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("company")
public class CompanyController {
	
	@Autowired
	CompanyRepository cr;
	
	@Autowired
	NumberOfAircraftRepository nar;
	
	@GetMapping("/getAllCompanies")
	ResponseEntity<List<CompanyDto>> getAllCompanies(){
		List<CompanyDto> dto = new ArrayList<CompanyDto>();
		List<Company> companies = cr.findAll();
		for(Company c : companies) {
			CompanyDto cdto = new CompanyDto(c);
			dto.add(cdto);
		}
		return new ResponseEntity<List<CompanyDto>>(dto, HttpStatus.OK);
	}
	
	@PostMapping("/getCompanyByName")
	ResponseEntity<CompanyDto> getCompanyByName(@RequestBody GetCompanyByNameRequestDto request){
		Company c = cr.findByNaziv(request.getNaziv());
		CompanyDto cdto = new CompanyDto(c);
		return new ResponseEntity<CompanyDto>(cdto, HttpStatus.OK);
	}
}
