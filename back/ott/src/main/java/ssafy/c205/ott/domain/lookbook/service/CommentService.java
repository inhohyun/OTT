package ssafy.c205.ott.domain.lookbook.service;

import ssafy.c205.ott.domain.lookbook.dto.requestdto.CommentMessageDto;

public interface CommentService {
    void createComment(String postId, CommentMessageDto commentMessageDto);
    void createReply(String postId, String commentId, CommentMessageDto commentMessageDto);
}
