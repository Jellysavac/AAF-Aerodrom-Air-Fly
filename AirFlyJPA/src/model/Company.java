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

	private double ocena;

	private String opis;

	private String prtljag;

	//bi-directional many-to-one association to Flight
	@OneToMany(mappedBy="company")
	private List<Flight> flights;

	//bi-directional many-to-one association to Comment
	@OneToMany(mappedBy="company")
	private List<Comment> comments;

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

	public double getOcena() {
		return this.ocena;
	}

	public void setOcena(double ocena) {
		this.ocena = ocena;
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

	public List<Flight> getFlights() {
		return this.flights;
	}

	public void setFlights(List<Flight> flights) {
		this.flights = flights;
	}

	public Flight addFlight(Flight flight) {
		getFlights().add(flight);
		flight.setCompany(this);

		return flight;
	}

	public Flight removeFlight(Flight flight) {
		getFlights().remove(flight);
		flight.setCompany(null);

		return flight;
	}

	public List<Comment> getComments() {
		return this.comments;
	}

	public void setComments(List<Comment> comments) {
		this.comments = comments;
	}

	public Comment addComment(Comment comment) {
		getComments().add(comment);
		comment.setCompany(this);

		return comment;
	}

	public Comment removeComment(Comment comment) {
		getComments().remove(comment);
		comment.setCompany(null);

		return comment;
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