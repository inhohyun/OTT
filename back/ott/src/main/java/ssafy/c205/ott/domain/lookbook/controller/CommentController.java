package ssafy.c205.ott.domain.lookbook.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ssafy.c205.ott.domain.lookbook.dto.requestdto.CommentMessageDto;
import ssafy.c205.ott.domain.lookbook.service.CommentService;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/comment")
@Tag(name = "댓글 컨트롤러", description = "댓글 생성, 조회, 삭제 등 전반적인 댓글을 관리하는 클래스")
public class CommentController {

    private final CommentService commentService;

    //댓글 작성
    @PostMapping("/{post_id}")
    public ResponseEntity<?> createComment(@PathVariable("post_id") String postId, @ModelAttribute
    CommentMessageDto commentMessageDto) {
        commentService.createComment(postId, commentMessageDto);
        return ResponseEntity.ok().body("댓글 작성을 완료했습니다.");
    }

    //대댓글 작성
    @PostMapping("/{post_id}/{comment_id}")
    public ResponseEntity<?> createReply(@PathVariable("post_id") String postId,
        @PathVariable("comment_id") String commentId,
        @ModelAttribute CommentMessageDto commentMessageDto) {
        commentService.createReply(postId, commentId, commentMessageDto);
        return null;
    }

}
