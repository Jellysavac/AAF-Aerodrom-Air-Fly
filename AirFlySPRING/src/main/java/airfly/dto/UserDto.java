package airfly.dto;

import model.Userr;

public class UserDto {
	
	private String ime;

	public UserDto(Userr u) {
		ime = u.getIme();
	}

	public String getIme() {
		return ime;
	}

	public void setIme(String ime) {
		this.ime = ime;
	}
	
	
}
