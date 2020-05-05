package airfly.dto;

import model.Reservation;

public class AddReservationResponseDto {

	private int id;
	
	public AddReservationResponseDto(Reservation r) {
		id = r.getId();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
}
