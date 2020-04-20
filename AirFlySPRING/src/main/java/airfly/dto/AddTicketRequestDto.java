package airfly.dto;

public class AddTicketRequestDto {
	
	private String klasa;
	private double cena;
	private int idLeta;
	
	public String getKlasa() {
		return klasa;
	}
	public void setKlasa(String klasa) {
		this.klasa = klasa;
	}
	public double getCena() {
		return cena;
	}
	public void setCena(double cena) {
		this.cena = cena;
	}
	public int getIdLeta() {
		return idLeta;
	}
	public void setIdLeta(int idLeta) {
		this.idLeta = idLeta;
	}
	
	
}
