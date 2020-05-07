package airfly.dto;

public class GetTicketPriceRequestDto {
	
	private int idLeta;
	private String klasa;
	
	public int getIdLeta() {
		return idLeta;
	}
	public void setIdLeta(int idLeta) {
		this.idLeta = idLeta;
	}
	public String getKlasa() {
		return klasa;
	}
	public void setKlasa(String klasa) {
		this.klasa = klasa;
	}
}
