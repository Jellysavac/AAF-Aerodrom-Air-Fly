package airfly.dto;

import model.Company;

public class BestCompaniesResponseDto {
	
	public String naziv;
	public double ocena;
	
	public BestCompaniesResponseDto(Company c) {
		naziv = c.getNaziv();
		ocena = c.getOcena();
	}

	public String getNaziv() {
		return naziv;
	}

	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}

	public double getOcena() {
		return ocena;
	}

	public void setOcena(double ocena) {
		this.ocena = ocena;
	}
	
}
