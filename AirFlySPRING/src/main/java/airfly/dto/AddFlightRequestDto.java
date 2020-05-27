package airfly.dto;

public class AddFlightRequestDto {

	String type;
	String date;
	int seats;
	int departureId;
	int arrivalId;
	int companyId;
	
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
	public int getDepartureId() {
		return departureId;
	}
	public void setDepartureId(int departureId) {
		this.departureId = departureId;
	}
	public int getArrivalId() {
		return arrivalId;
	}
	public void setArrivalId(int arrivalId) {
		this.arrivalId = arrivalId;
	}
	public int getCompanyId() {
		return companyId;
	}
	public void setCompanyId(int companyId) {
		this.companyId = companyId;
	}
	
}
