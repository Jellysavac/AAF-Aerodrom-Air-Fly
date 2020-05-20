package airfly.dto;

import model.Company;

public class RatingCompanyResponseDto {

	private int id;
	private double ocena;
	
	public RatingCompanyResponseDto(Company c) {
		id = c.getId();
		ocena = c.getOcena();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public double getOcena() {
		return ocena;
	}

	public void setOcena(double ocena) {
		this.ocena = ocena;
	}
}
