package ssafy.c205.ott.domain.lookbook.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum LookbookExceptionMessage {
    LOOKBOOK_NOT_FOUND("해당 Lookbook을 찾지 못했습니다.", HttpStatus.NOT_FOUND.value());

    private final String message;
    private final int status;

    private LookbookExceptionMessage(final String message, final int status) {
        this.message = message;
        this.status = status;
    }
}
