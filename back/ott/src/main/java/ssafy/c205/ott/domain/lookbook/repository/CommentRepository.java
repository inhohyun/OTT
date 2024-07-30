package ssafy.c205.ott.domain.lookbook.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.c205.ott.common.entity.CommentStatus;
import ssafy.c205.ott.domain.lookbook.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByLookbookIdAndCommentStatusAndParentIsNull(Long lookbookId, CommentStatus commentStatus);
}
