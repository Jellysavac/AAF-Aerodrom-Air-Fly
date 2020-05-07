package airfly.dto;

import model.Ticket;

public class GetTicketPriceResponseDto {
	
	private double cena;
	
	public GetTicketPriceResponseDto(Ticket t) {
		cena = t.getCena();
	}

	public double getCena() {
		return cena;
	}

	public void setCena(double cena) {
		this.cena = cena;
	}
}
