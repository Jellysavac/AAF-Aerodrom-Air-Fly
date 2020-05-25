package airfly.dto;

import model.Flight;

public class AddFlightResponseDto {
	
private int id;
	
	public AddFlightResponseDto(Flight flight) {
		id = flight.getId();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

}
