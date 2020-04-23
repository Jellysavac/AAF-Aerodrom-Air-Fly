package airfly.dto;

import model.Flight;
import model.Ticket;

public class GetCheapestTicketDto {
	private String klasa;
	private double cena;
	private String polazniAerodrom;
	private String dolazniAerodrom;
	private String datum;
	
	public GetCheapestTicketDto(Ticket karta) {
		klasa=karta.getKlasa();
		cena=karta.getCena();
		polazniAerodrom=karta.getFlight().getAirport1().getNaziv();
		dolazniAerodrom=karta.getFlight().getAirport2().getNaziv();
		datum=karta.getFlight().getDatum();
					
	}

	public String getKlasa() {
		return klasa;
	}

	public void setKlasa(String klasa) {
		this.klasa = klasa;
	}

	public double getCena() {
		return cena;
	}

	public void setCena(double cena) {
		this.cena = cena;
	}

	public String getPolazniAerodrom() {
		return polazniAerodrom;
	}

	public void setPolazniAerodrom(String polazniAerodrom) {
		this.polazniAerodrom = polazniAerodrom;
	}

	public String getDolazniAerodrom() {
		return dolazniAerodrom;
	}

	public void setDolazniAerodrom(String dolazniAerodrom) {
		this.dolazniAerodrom = dolazniAerodrom;
	}

	public String getDatum() {
		return datum;
	}

	public void setDatum(String datum) {
		this.datum = datum;
	}
	

}
