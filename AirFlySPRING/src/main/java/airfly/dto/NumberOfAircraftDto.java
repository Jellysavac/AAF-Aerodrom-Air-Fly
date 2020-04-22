package airfly.dto;

import model.NumberOfAircraft;

public class NumberOfAircraftDto {

	private String tip;
	private int kolicina;
	private byte[] slika;
	
	public NumberOfAircraftDto(NumberOfAircraft na) {
		tip = na.getAircraft().getTip();
		kolicina = na.getKolicina();
		slika = na.getAircraft().getSlika();
	}

	public String getTip() {
		return tip;
	}

	public void setTip(String tip) {
		this.tip = tip;
	}

	public int getKolicina() {
		return kolicina;
	}

	public void setKolicina(int kolicina) {
		this.kolicina = kolicina;
	}

	public byte[] getSlika() {
		return slika;
	}

	public void setSlika(byte[] slika) {
		this.slika = slika;
	}
	
}
