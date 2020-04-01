package airfly.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import airfly.dto.UserDto;
import airfly.repository.UserRepository;
import model.Userr;

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
	
	
	
}
