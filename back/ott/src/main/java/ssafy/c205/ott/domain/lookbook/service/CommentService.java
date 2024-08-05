package ssafy.c205.ott.domain.lookbook.service;

import java.util.List;
import ssafy.c205.ott.domain.lookbook.dto.requestdto.CommentMessageDto;
import ssafy.c205.ott.domain.lookbook.dto.requestdto.CommentSelectDto;
import ssafy.c205.ott.domain.lookbook.dto.responsedto.CommentSelectResponseDto;

public interface CommentService {

    void createComment(String postId, CommentMessageDto commentMessageDto);

    void createReply(String postId, String commentId, CommentMessageDto commentMessageDto);

    List<CommentSelectResponseDto> selectComment(String postId, CommentSelectDto commentSelectDto);

    void updateComment(String postId, String commentId, CommentMessageDto commentMessageDto);

    void deleteComment(String postId, String commentId);

    int countComment(String postId);
}
