package ssafy.c205.ott.domain.item.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ItemExceptionMessage {
    CLOTHES_NOT_FOUND("옷을 찾지 못했습니다.", HttpStatus.NOT_FOUND.value()),
    IMAGE_NOT_FOUND("사진이 존재하지 않습니다.", HttpStatus.BAD_REQUEST.value());

    private final String message;
    private final int status;

    ItemExceptionMessage(String message, int status) {
        this.message = message;
        this.status = status;
    }
}
