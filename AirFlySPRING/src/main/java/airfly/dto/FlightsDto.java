package airfly.dto;
import model.Flight;

public class FlightsDto {
	
	private int id;
	private String datum;
	private int broj_mesta;
	private String vrsta;
	private String nazivPolaznog;
	private String nazivDolaznog;
	private String kompanija;
	private String dolazniGrad;
	private String polazniGrad;
	
	public FlightsDto(Flight let) {
		id = let.getId();
		datum=let.getDatum();
		broj_mesta=let.getBrojMesta();
		vrsta=let.getVrsta();
		nazivPolaznog=let.getAirport1().getNaziv();
		nazivDolaznog=let.getAirport2().getNaziv();
		kompanija=let.getCompany().getNaziv();
		polazniGrad = let.getAirport1().getCity().getNaziv();
		dolazniGrad = let.getAirport2().getCity().getNaziv();
		
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

	public String getDolazniGrad() {
		return dolazniGrad;
	}

	public void setDolazniGrad(String dolazniGrad) {
		this.dolazniGrad = dolazniGrad;
	}

	public String getPolazniGrad() {
		return polazniGrad;
	}

	public void setPolazniGrad(String polazniGrad) {
		this.polazniGrad = polazniGrad;
	}
	
	
	
	}