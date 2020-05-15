package airfly.dto;

import model.Comment;

public class GetAllCommentsResponseDto {

private String tekst;
	
	public GetAllCommentsResponseDto(Comment c) {
		tekst = c.getTekst();
	}

	public String getTekst() {
		return tekst;
	}

	public void setTekst(String tekst) {
		this.tekst = tekst;
	}

}
