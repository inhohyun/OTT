package ssafy.c205.ott.domain.lookbook.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum CommentExceptionMessage {
    COMMENT_NOT_FOUND("댓글을 찾지 못했습니다.", HttpStatus.NOT_FOUND.value());

    private final String message;
    private final int status;

    CommentExceptionMessage(String message, int status) {
        this.message = message;
        this.status = status;
    }
}
