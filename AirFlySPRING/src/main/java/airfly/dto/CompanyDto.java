package airfly.dto;

import model.Company;

public class CompanyDto {

	private int id;
	private String naziv;
	private String opis;
	private String prtljag;
	private double ocena;
	
	public CompanyDto(Company c) {
		id = c.getId();
		naziv = c.getNaziv();
		opis = c.getOpis();
		prtljag = c.getPrtljag();
		ocena = c.getOcena();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
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

	public double getOcena() {
		return ocena;
	}

	public void setOcena(double ocena) {
		this.ocena = ocena;
	}
}
