package ssafy.c205.ott.domain.lookbook.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ssafy.c205.ott.domain.lookbook.dto.requestdto.CommentMessageDto;
import ssafy.c205.ott.domain.lookbook.dto.requestdto.CommentSelectDto;
import ssafy.c205.ott.domain.lookbook.dto.responsedto.CommentSelectResponseDto;
import ssafy.c205.ott.domain.lookbook.service.CommentService;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/comment")
@Tag(name = "댓글 컨트롤러", description = "댓글 생성, 조회, 삭제 등 전반적인 댓글을 관리하는 클래스")
public class CommentController {

    private final CommentService commentService;

    //댓글 작성
    @Operation(summary = "댓글 작성 메서드", description = "<big>룩북에 댓글</big>작성합니다")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "댓글 작성을 완료했습니다."),
    })
    @PostMapping("/{post_id}")
    public ResponseEntity<?> createComment(@PathVariable("post_id") String postId, @ModelAttribute
    CommentMessageDto commentMessageDto) {
        log.info("postId : {}", postId);
        log.info("dto : {}", commentMessageDto.toString());
        commentService.createComment(postId, commentMessageDto);
        return ResponseEntity.ok().body("댓글 작성을 완료했습니다.");
    }

    //대댓글 작성
    @Operation(summary = "대댓글 작성 메서드", description = "룩북의 댓글에 <big>대댓글</big>을 작성합니다")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "대댓글 작성을 완료했습니다."),
    })
    @PostMapping("/{post_id}/{comment_id}")
    public ResponseEntity<?> createReply(@PathVariable("post_id") String postId,
        @PathVariable("comment_id") String commentId,
        @ModelAttribute CommentMessageDto commentMessageDto) {
        commentService.createReply(postId, commentId, commentMessageDto);
        return ResponseEntity.ok().body("대댓글 작성을 완료했습니다.");
    }

    //댓글 조회
    @Operation(summary = "댓글 조회 메서드", description = "<big>룩북에 댓글</big>을 조회합니다")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "해당 룩북의 모든 댓글"),
    })
    @GetMapping("/{post_id}")
    public ResponseEntity<?> selectComment(@PathVariable("post_id") String postId, @ModelAttribute
    CommentSelectDto commentSelectDto) {
        List<CommentSelectResponseDto> postComments = commentService.selectComment(
            postId, commentSelectDto);
        return ResponseEntity.ok().body(postComments);
    }

    //댓글 수정
    @Operation(summary = "댓글 수정 메서드", description = "<big>룩북에 댓글</big>을 수정합니다")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "댓글 수정을 완료했습니다."),
    })
    @PutMapping("/{post_id}/{comment_id}")
    public ResponseEntity<?> updateComment(@PathVariable("post_id") String postId,
        @PathVariable("comment_id") String commentId,
        @ModelAttribute CommentMessageDto commentMessageDto) {
        commentService.updateComment(postId, commentId, commentMessageDto);
        return ResponseEntity.ok().body("댓글 수정을 완료했습니다.");
    }

    //댓글 삭제
    @Operation(summary = "댓글 삭제 메서드", description = "<big>룩북에 댓글</big>을 삭제합니다")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "댓글 삭제를 완료했습니다."),
    })
    @DeleteMapping("/{post_id}/{comment_id}")
    public ResponseEntity<?> deleteComment(@PathVariable("post_id") String postId,
        @PathVariable("comment_id") String commentId) {
        commentService.deleteComment(postId, commentId);
        return ResponseEntity.ok().body("댓글 삭제를 완료했습니다.");
    }

    @Operation(summary = "댓글수 조회 메서드", description = "<big>댓글수를 </big>조회합니다")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "댓글 수"),
        @ApiResponse(responseCode = "404", description = "해당 포스트의 댓글을 찾을 수 없습니다."),
    })
    @GetMapping("/{post_id}/count")
    public ResponseEntity<?> countComment(@PathVariable("post_id") String postId) {
        int countComment = commentService.countComment(postId);
        if (countComment < 0) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("해당 포스트의 댓글을 찾을 수 없습니다.");
        }
        return ResponseEntity.ok().body(countComment);
    }
}
