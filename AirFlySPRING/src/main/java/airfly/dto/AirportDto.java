package airfly.dto;

import model.Airport;

public class AirportDto {

	private String naziv;
	private String grad;
	
	public AirportDto (Airport aerodrom) {
		naziv=aerodrom.getNaziv();
		grad = aerodrom.getCity().getNaziv();
	}

	public String getGrad() {
		return grad;
	}

	public void setGrad(String grad) {
		this.grad = grad;
	}

	public String getNaziv() {
		return naziv;
	}

	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}
	
}
