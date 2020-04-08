package airfly.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import airfly.dto.LoginRequestDto;
import airfly.dto.LoginResponseDto;
import airfly.dto.UserDto;
import airfly.repository.UserRepository;
import model.Userr;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/auth")
public class AuthControler {
	
	@Autowired
	UserRepository ur;
	
//	 @RequestMapping(value = "/register", method = RequestMethod.POST)
//	 RequestEntity<?> registerUser() {
//	 	try {
//	 		RegisterResponseDto rdto = new RegisterResponseDto();
//	 		return  RequestEntity<?>();
//	 		
//	 		
//		} catch (Exception e) {
//			// TODO: handle exception
//		 }
//
//	 }    
}