package airfly.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import airfly.dto.GetAllCommentsRequestDto;
import airfly.dto.GetAllCommentsResponseDto;
import airfly.repository.CommentsRepository;
import model.Comment;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/comment")
public class CommentsController {
	
	@Autowired
	CommentsRepository cr;
	
	@PostMapping("/getAllComments")
	ResponseEntity<List<GetAllCommentsResponseDto>> getAllComments(@RequestBody GetAllCommentsRequestDto request){
		List<GetAllCommentsResponseDto> cdto = new ArrayList<GetAllCommentsResponseDto>();
		List<Comment> comments = cr.findAllCommentsByCompany(request.getNaziv());
		for(Comment c : comments) {
			GetAllCommentsResponseDto dto = new GetAllCommentsResponseDto(c);
			cdto.add(dto);
		}
		return new ResponseEntity<List<GetAllCommentsResponseDto>>(cdto, HttpStatus.OK);
	}
}
