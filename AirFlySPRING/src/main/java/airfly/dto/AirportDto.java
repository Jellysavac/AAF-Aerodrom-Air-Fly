package airfly.dto;

import model.Airport;

public class AirportDto {
	
	private int id;
	private String naziv;
	private String grad;
	
	public AirportDto (Airport aerodrom) {
		id = aerodrom.getId();
		naziv=aerodrom.getNaziv();
		grad = aerodrom.getCity().getNaziv();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
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
