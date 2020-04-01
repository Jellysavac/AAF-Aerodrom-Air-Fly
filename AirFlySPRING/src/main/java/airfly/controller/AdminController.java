package airfly.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
public class AdminController {
	
	@GetMapping("/home")
	public String admin() {
		return ("<h1>Welcome Admin</h1>");
	}
}
