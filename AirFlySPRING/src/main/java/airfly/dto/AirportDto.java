package airfly.dto;

import model.Airport;

public class AirportDto {

	private String naziv;
	
	
	public AirportDto (Airport aerodrom) {
		naziv=aerodrom.getNaziv();
	}

	public String getNaziv() {
		return naziv;
	}

	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}
	
}
