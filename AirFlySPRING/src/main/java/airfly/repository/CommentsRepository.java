package airfly.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import model.Comment;

public interface CommentsRepository extends JpaRepository<Comment, Integer>{
	
	@Query(value = "SELECT * FROM comments c INNER JOIN company cm on cm.id=c.company_id WHERE cm.naziv=:naziv", nativeQuery = true)
	List<Comment> findAllCommentsByCompany(@Param("naziv") String naziv);
}
