package airfly.dto;

import model.Ticket;

public class AddTicketResponseDto {
	
	private int id;
	
	public AddTicketResponseDto(Ticket ticket) {
		id = ticket.getId();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
	
}
