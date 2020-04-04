package airfly.dto;
import model.Flight;

public class getFlightsDto {

	private String datum;
	private int broj_mesta;
	private String vrsta;
	private String nazivPolaznog;
	private String nazivDolaznog;
	private String kompanija;
	
	public getFlightsDto(Flight let) {
		
		datum=let.getDatum();
		broj_mesta=let.getBrojMesta();
		vrsta=let.getVrsta();
		nazivPolaznog=let.getAirport1().getNaziv();
		nazivDolaznog=let.getAirport2().getNaziv();
		kompanija=let.getCompany().getNaziv();
		
	}

	public String getDatum() {
		return datum;
	}

	public void setDatum(String datum) {
		this.datum = datum;
	}

	public int getBroj_mesta() {
		return broj_mesta;
	}

	public void setBroj_mesta(int broj_mesta) {
		this.broj_mesta = broj_mesta;
	}

	public String getVrsta() {
		return vrsta;
	}

	public void setVrsta(String vrsta) {
		this.vrsta = vrsta;
	}

	public String getNazivPolaznog() {
		return nazivPolaznog;
	}

	public void setNazivPolaznog(String nazivPolaznog) {
		this.nazivPolaznog = nazivPolaznog;
	}

	public String getNazivDolaznog() {
		return nazivDolaznog;
	}

	public void setNazivDolaznog(String nazivDolaznog) {
		this.nazivDolaznog = nazivDolaznog;
	}

	public String getKompanija() {
		return kompanija;
	}

	public void setKompanija(String kompanija) {
		this.kompanija = kompanija;
	}
	
	
	
	}