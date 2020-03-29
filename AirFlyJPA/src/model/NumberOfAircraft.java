package model;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the number_of_aircraft database table.
 * 
 */
@Entity
@Table(name="number_of_aircraft")
@NamedQuery(name="NumberOfAircraft.findAll", query="SELECT n FROM NumberOfAircraft n")
public class NumberOfAircraft implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;

	private int kolicina;

	//bi-directional many-to-one association to Aircraft
	@ManyToOne
	private Aircraft aircraft;

	//bi-directional many-to-one association to Company
	@ManyToOne
	private Company company;

	public NumberOfAircraft() {
	}

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getKolicina() {
		return this.kolicina;
	}

	public void setKolicina(int kolicina) {
		this.kolicina = kolicina;
	}

	public Aircraft getAircraft() {
		return this.aircraft;
	}

	public void setAircraft(Aircraft aircraft) {
		this.aircraft = aircraft;
	}

	public Company getCompany() {
		return this.company;
	}

	public void setCompany(Company company) {
		this.company = company;
	}

}