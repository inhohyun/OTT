package ssafy.c205.ott.domain.notification.util;

public enum NotificationMessage {
    COMMENT("님이 댓글을 남겼습니다."),
    AI_COMPLETE("이미지 생성이 완료되었습니다.");

    private String message;
    private NotificationMessage(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
