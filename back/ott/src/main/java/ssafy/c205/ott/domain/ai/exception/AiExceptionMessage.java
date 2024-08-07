package ssafy.c205.ott.domain.ai.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum AiExceptionMessage {
    BAD_REQUEST("AI 요청에 필요한 정보가 없습니다.", HttpStatus.BAD_REQUEST.value());

    private final String message;
    private final int status;

    AiExceptionMessage(String message, int status) {
        this.message = message;
        this.status = status;
    }
}
