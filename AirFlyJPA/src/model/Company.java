package model;

import java.io.Serializable;
import javax.persistence.*;
import java.util.List;


/**
 * The persistent class for the company database table.
 * 
 */
@Entity
@NamedQuery(name="Company.findAll", query="SELECT c FROM Company c")
public class Company implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;

	private String naziv;

	private String opis;

	private String prtljag;

	//bi-directional many-to-one association to NumberOfAircraft
	@OneToMany(mappedBy="company")
	private List<NumberOfAircraft> numberOfAircrafts;

	public Company() {
	}

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNaziv() {
		return this.naziv;
	}

	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}

	public String getOpis() {
		return this.opis;
	}

	public void setOpis(String opis) {
		this.opis = opis;
	}

	public String getPrtljag() {
		return this.prtljag;
	}

	public void setPrtljag(String prtljag) {
		this.prtljag = prtljag;
	}

	public List<NumberOfAircraft> getNumberOfAircrafts() {
		return this.numberOfAircrafts;
	}

	public void setNumberOfAircrafts(List<NumberOfAircraft> numberOfAircrafts) {
		this.numberOfAircrafts = numberOfAircrafts;
	}

	public NumberOfAircraft addNumberOfAircraft(NumberOfAircraft numberOfAircraft) {
		getNumberOfAircrafts().add(numberOfAircraft);
		numberOfAircraft.setCompany(this);

		return numberOfAircraft;
	}

	public NumberOfAircraft removeNumberOfAircraft(NumberOfAircraft numberOfAircraft) {
		getNumberOfAircrafts().remove(numberOfAircraft);
		numberOfAircraft.setCompany(null);

		return numberOfAircraft;
	}

}