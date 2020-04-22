package airfly.dto;

import model.Userr;

public class RegisterResponseDto {

	private int id;
	
	public RegisterResponseDto(Userr u) {
		
		id = u.getId();
		
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
	
}
