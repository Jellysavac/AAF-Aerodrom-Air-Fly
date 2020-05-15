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

import airfly.dto.AddCommentRequestDto;
import airfly.dto.AddCommentResponseDto;
import airfly.dto.GetAllCommentsRequestDto;
import airfly.dto.GetAllCommentsResponseDto;
import airfly.repository.CommentsRepository;
import airfly.repository.CompanyRepository;
import airfly.repository.UserRepository;
import model.Comment;
import model.Company;
import model.Userr;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/comment")
public class CommentsController {
	
	@Autowired
	CommentsRepository cr;
	
	@Autowired
	UserRepository ur;
	
	@Autowired
	CompanyRepository ccr;
	
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
	
	@PostMapping("/addComment")
	ResponseEntity<AddCommentResponseDto> addComment(@RequestBody AddCommentRequestDto request){
		Comment c = new Comment();
		c.setTekst(request.getTekst());
		Userr u = ur.findById(request.getIdKorisnika());
		c.setUserr(u);
		Company com = ccr.findById(request.getIdKompanije());
		c.setCompany(com);
		cr.save(c);
		AddCommentResponseDto dto = new AddCommentResponseDto(c);
		return new ResponseEntity<AddCommentResponseDto>(dto, HttpStatus.OK);
		
	}
}
