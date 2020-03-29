package model;

import java.io.Serializable;
import javax.persistence.*;
import java.util.List;


/**
 * The persistent class for the city database table.
 * 
 */
@Entity
@NamedQuery(name="City.findAll", query="SELECT c FROM City c")
public class City implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;

	private String naziv;

	//bi-directional many-to-one association to Airport
	@OneToMany(mappedBy="city")
	private List<Airport> airports;

	public City() {
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

	public List<Airport> getAirports() {
		return this.airports;
	}

	public void setAirports(List<Airport> airports) {
		this.airports = airports;
	}

	public Airport addAirport(Airport airport) {
		getAirports().add(airport);
		airport.setCity(this);

		return airport;
	}

	public Airport removeAirport(Airport airport) {
		getAirports().remove(airport);
		airport.setCity(null);

		return airport;
	}

}