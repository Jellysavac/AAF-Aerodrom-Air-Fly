package model;

import java.io.Serializable;
import javax.persistence.*;
import java.util.List;


/**
 * The persistent class for the aircraft database table.
 * 
 */
@Entity
@NamedQuery(name="Aircraft.findAll", query="SELECT a FROM Aircraft a")
public class Aircraft implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;

	@Lob
	private byte[] slika;

	private String tip;

	//bi-directional many-to-one association to NumberOfAircraft
	@OneToMany(mappedBy="aircraft")
	private List<NumberOfAircraft> numberOfAircrafts;

	public Aircraft() {
	}

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public byte[] getSlika() {
		return this.slika;
	}

	public void setSlika(byte[] slika) {
		this.slika = slika;
	}

	public String getTip() {
		return this.tip;
	}

	public void setTip(String tip) {
		this.tip = tip;
	}

	public List<NumberOfAircraft> getNumberOfAircrafts() {
		return this.numberOfAircrafts;
	}

	public void setNumberOfAircrafts(List<NumberOfAircraft> numberOfAircrafts) {
		this.numberOfAircrafts = numberOfAircrafts;
	}

	public NumberOfAircraft addNumberOfAircraft(NumberOfAircraft numberOfAircraft) {
		getNumberOfAircrafts().add(numberOfAircraft);
		numberOfAircraft.setAircraft(this);

		return numberOfAircraft;
	}

	public NumberOfAircraft removeNumberOfAircraft(NumberOfAircraft numberOfAircraft) {
		getNumberOfAircrafts().remove(numberOfAircraft);
		numberOfAircraft.setAircraft(null);

		return numberOfAircraft;
	}

}