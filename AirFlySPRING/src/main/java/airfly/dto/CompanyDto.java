package airfly.dto;

import model.Company;

public class CompanyDto {

	private String naziv;
	private String opis;
	private String prtljag;
	
	public CompanyDto(Company c) {
		naziv = c.getNaziv();
		opis = c.getOpis();
		prtljag = c.getPrtljag();
	}

	public String getNaziv() {
		return naziv;
	}

	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}

	public String getOpis() {
		return opis;
	}

	public void setOpis(String opis) {
		this.opis = opis;
	}

	public String getPrtljag() {
		return prtljag;
	}

	public void setPrtljag(String prtljag) {
		this.prtljag = prtljag;
	}
}
