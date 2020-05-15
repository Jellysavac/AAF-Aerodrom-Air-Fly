package airfly.dto;

import model.Comment;

public class AddCommentResponseDto {

	private int id;
	
	public AddCommentResponseDto(Comment c) {
		id=c.getId();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
}
