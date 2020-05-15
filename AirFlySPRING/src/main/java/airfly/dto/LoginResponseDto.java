package airfly.dto;

import model.Userr;

public class LoginResponseDto {
	
	private int id;
	private String ime;
	private String prezime;
	private String email;
	private String adresa;
	private int brojRezervacija;
	private String uloga;
	
	public LoginResponseDto(Userr user) {
		id = user.getId();
		ime = user.getIme()+" "+user.getPrezime();
		prezime = user.getPrezime();
		email = user.getEmail();
		adresa = user.getAdresa();
		brojRezervacija = user.getBrojRezervacija();
		uloga = user.getUloga();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getIme() {
		return ime;
	}

	public void setIme(String ime) {
		this.ime = ime;
	}

	public String getPrezime() {
		return prezime;
	}

	public void setPrezime(String prezime) {
		this.prezime = prezime;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getAdresa() {
		return adresa;
	}

	public void setAdresa(String adresa) {
		this.adresa = adresa;
	}

	public int getBrojRezervacija() {
		return brojRezervacija;
	}

	public void setBrojRezervacija(int brojRezervacija) {
		this.brojRezervacija = brojRezervacija;
	}

	public String getUloga() {
		return uloga;
	}

	public void setUloga(String uloga) {
		this.uloga = uloga;
	}
	
}
