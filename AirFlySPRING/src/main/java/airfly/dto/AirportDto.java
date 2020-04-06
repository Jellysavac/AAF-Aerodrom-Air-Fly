package airfly.dto;

import model.Airport;

public class AirportDto {

	private String naziv;
	private String skracenica;
	private String grad;
	
	public AirportDto (Airport aerodrom) {
		
		naziv=aerodrom.getNaziv();
		skracenica=aerodrom.getSkracenica();
		grad=aerodrom.getCity().getNaziv();
	}

	public String getNaziv() {
		return naziv;
	}

	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}

	public String getSkracenica() {
		return skracenica;
	}

	public void setSkracenica(String skracenica) {
		this.skracenica = skracenica;
	}

	public String getGrad() {
		return grad;
	}

	public void setGrad(String grad) {
		this.grad = grad;
	}
	
	
}
