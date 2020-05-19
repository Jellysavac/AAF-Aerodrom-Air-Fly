package airfly.dto;

import model.Ticket;

public class GetTicketPriceResponseDto {
	
	private int id;
	private double cena;
	
	public GetTicketPriceResponseDto(Ticket t) {
		id = t.getId();
		cena = t.getCena();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public double getCena() {
		return cena;
	}

	public void setCena(double cena) {
		this.cena = cena;
	}
}
