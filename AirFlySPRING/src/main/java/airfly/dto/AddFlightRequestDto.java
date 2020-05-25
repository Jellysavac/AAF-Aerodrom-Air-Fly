package airfly.dto;

public class AddFlightRequestDto {

	String type;
	String date;
	int seats;
	int idDeparture;
	int idArrival;
	int idCompany;
	
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public int getSeats() {
		return seats;
	}
	public void setSeats(int seats) {
		this.seats = seats;
	}
	public int getIdDeparture() {
		return idDeparture;
	}
	public void setIdDeparture(int idDeparture) {
		this.idDeparture = idDeparture;
	}
	public int getIdArrival() {
		return idArrival;
	}
	public void setIdArrival(int idArrival) {
		this.idArrival = idArrival;
	}
	public int getIdCompany() {
		return idCompany;
	}
	public void setIdCompany(int idCompany) {
		this.idCompany = idCompany;
	}
	
}
