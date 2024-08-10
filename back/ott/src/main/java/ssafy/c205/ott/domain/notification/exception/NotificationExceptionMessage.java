package ssafy.c205.ott.domain.notification.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum NotificationExceptionMessage {
    NOTIFICATION_NOT_FOUND("알림이 존재하지 않습니다.", HttpStatus.NOT_FOUND.value()),;

    private final String message;
    private final int status;

    NotificationExceptionMessage(String message, int status) {
        this.message = message;
        this.status = status;
    }
}
