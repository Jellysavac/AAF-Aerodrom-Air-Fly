package airfly.dto;

public class FlightForReservationRequsetDto {
	
	private String polazniAerodrom;
	private String dolazniAerodrom;
	private String datum;
	private int brojPutnika;
	
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
	public int getBrojPutnika() {
		return brojPutnika;
	}
	public void setBrojPutnika(int brojPutnika) {
		this.brojPutnika = brojPutnika;
	}
}
