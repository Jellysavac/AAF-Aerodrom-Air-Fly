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

import airfly.dto.LoginRequestDto;
import airfly.dto.LoginResponseDto;
import airfly.dto.RegisterRequestDto;
import airfly.dto.RegisterResponseDto;
import airfly.repository.UserRepository;
import model.Userr;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	UserRepository ur;
	
	@PostMapping("/signin")
	ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequestDto request){
		try {
			Userr u = ur.findUserByEmailAndLozinka(request.getEmail(), request.getLozinka()).get();
			LoginResponseDto ldto = new LoginResponseDto(u);
			return new ResponseEntity<LoginResponseDto>(ldto, HttpStatus.OK);
		}catch(Exception e) {
			return new ResponseEntity<String>("Not logged! " + e.getMessage(), HttpStatus.UNAUTHORIZED);
		}
	}
	
	
	@PostMapping("/register")
	ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequestDto request) {
		try {
			Userr u = new Userr();
			u.setIme(request.getName());
			u.setPrezime(request.getSurname());
			u.setEmail(request.getEmail());
			u.setAdresa(request.getAdress());
			u.setLozinka(request.getPassword());
			u.setReservations(null);
			u.setUloga("ROLE_USER");
			Userr existingUser = ur.findByEmail(request.getEmail());
			if(existingUser == null && request.getPassword().equals(request.getPassword_confirm())) {
				ur.save(u);
				return new ResponseEntity<RegisterResponseDto>(HttpStatus.OK);
			}
			else if(existingUser != null) {
				return new ResponseEntity<String>("Korisnik vec postoji", HttpStatus.BAD_REQUEST);
			}
			else {
				return new ResponseEntity<String>("Lozinke nisu iste", HttpStatus.CONFLICT);
			}
		} catch (Exception e) {
			e.getMessage();
			e.printStackTrace();
			return new ResponseEntity<String>("Error!" + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
