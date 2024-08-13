package ssafy.c205.ott.domain.notification.exception;

public class NotificationNotFoundException extends RuntimeException{
    @Override
    public String getMessage() {
        return NotificationExceptionMessage.NOTIFICATION_NOT_FOUND.getMessage();
    }

    public int getStatus() {
        return NotificationExceptionMessage.NOTIFICATION_NOT_FOUND.getStatus();
    }
}
