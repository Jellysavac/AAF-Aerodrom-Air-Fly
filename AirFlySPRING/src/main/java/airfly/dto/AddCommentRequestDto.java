package airfly.dto;

public class AddCommentRequestDto {

	private int idKorisnika;
	private int idKompanije;
	private String tekst;
	
	public int getIdKorisnika() {
		return idKorisnika;
	}
	public void setIdKorisnika(int idKorisnika) {
		this.idKorisnika = idKorisnika;
	}
	public int getIdKompanije() {
		return idKompanije;
	}
	public void setIdKompanije(int idKompanije) {
		this.idKompanije = idKompanije;
	}
	public String getTekst() {
		return tekst;
	}
	public void setTekst(String tekst) {
		this.tekst = tekst;
	}
}
