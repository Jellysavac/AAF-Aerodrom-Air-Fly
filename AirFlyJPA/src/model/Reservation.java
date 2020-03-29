package model;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the reservation database table.
 * 
 */
@Entity
@NamedQuery(name="Reservation.findAll", query="SELECT r FROM Reservation r")
public class Reservation implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;

	@Column(name="broja_karata")
	private int brojaKarata;

	private double cena;

	//bi-directional many-to-one association to Ticket
	@ManyToOne
	@JoinColumn(name="karta_id")
	private Ticket ticket;

	//bi-directional many-to-one association to Userr
	@ManyToOne
	@JoinColumn(name="korisnik_id")
	private Userr userr;

	public Reservation() {
	}

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getBrojaKarata() {
		return this.brojaKarata;
	}

	public void setBrojaKarata(int brojaKarata) {
		this.brojaKarata = brojaKarata;
	}

	public double getCena() {
		return this.cena;
	}

	public void setCena(double cena) {
		this.cena = cena;
	}

	public Ticket getTicket() {
		return this.ticket;
	}

	public void setTicket(Ticket ticket) {
		this.ticket = ticket;
	}

	public Userr getUserr() {
		return this.userr;
	}

	public void setUserr(Userr userr) {
		this.userr = userr;
	}

}