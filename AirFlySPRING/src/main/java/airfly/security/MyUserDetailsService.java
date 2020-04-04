package airfly.security;
/*
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import airfly.repository.UserRepository;
import model.Userr;

@Service
public class MyUserDetailsService implements UserDetailsService{
	
	@Autowired
	UserRepository ur;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		Optional<Userr> user = ur.findByEmail(email);
		user.orElseThrow(() -> new UsernameNotFoundException("Not found: " + email));
		return user.map(MyUserDetails::new).get();
	}
	
	
}
*/