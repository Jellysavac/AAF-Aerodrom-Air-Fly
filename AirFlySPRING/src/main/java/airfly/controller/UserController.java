package airfly.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import airfly.dto.LoginRequestDto;
import airfly.dto.LoginResponseDto;
import airfly.dto.UserDto;
import airfly.repository.UserRepository;
import model.Userr;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	UserRepository ur;
	
	//metoda za test baze
	@GetMapping("/getAllUsers")
	ResponseEntity<List<UserDto>> getAllUsers(){
		List<UserDto> udto = new ArrayList<UserDto>();
		List<Userr> users = ur.findAll();
		for(Userr u : users) {
			UserDto user = new UserDto(u);
			udto.add(user);
		}
		return new ResponseEntity<List<UserDto>>(udto, HttpStatus.OK);
	}
	
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
	
	
//	@PostMappingI("/register")
}
