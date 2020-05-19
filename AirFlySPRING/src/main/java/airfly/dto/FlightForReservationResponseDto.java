package airfly.dto;

import model.Flight;

public class FlightForReservationResponseDto {
	
	private int id;
	private String datum;
	private String vrsta;
	private String polazni;
	private String dolazni;
	private String kompanija;
	private String gradDolazni;
	private String gradPolazni;
	
	public FlightForReservationResponseDto(Flight f) {
		id = f.getId();
		datum = f.getDatum();
		vrsta = f.getVrsta();
		polazni = f.getAirport1().getNaziv();
		dolazni = f.getAirport2().getNaziv();
		kompanija = f.getCompany().getNaziv();
		gradPolazni = f.getAirport1().getCity().getNaziv();
		gradDolazni = f.getAirport2().getCity().getNaziv();
	}
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}


	public String getDatum() {
		return datum;
	}

	public void setDatum(String datum) {
		this.datum = datum;
	}

	public String getVrsta() {
		return vrsta;
	}

	public void setVrsta(String vrsta) {
		this.vrsta = vrsta;
	}

	public String getPolazni() {
		return polazni;
	}

	public void setPolazni(String polazni) {
		this.polazni = polazni;
	}

	public String getDolazni() {
		return dolazni;
	}

	public void setDolazni(String dolazni) {
		this.dolazni = dolazni;
	}

	public String getKompanija() {
		return kompanija;
	}

	public void setKompanija(String kompanija) {
		this.kompanija = kompanija;
	}
	
	public String getGradDolazni() {
		return gradDolazni;
	}

	public void setGradDolazni(String gradDolazni) {
		this.gradDolazni = gradDolazni;
	}

	public String getGradPolazni() {
		return gradPolazni;
	}

	public void setGradPolazni(String gradPolazni) {
		this.gradPolazni = gradPolazni;
	}
	
}
