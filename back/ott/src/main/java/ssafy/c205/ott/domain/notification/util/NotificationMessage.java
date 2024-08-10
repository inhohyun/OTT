package ssafy.c205.ott.domain.notification.util;

public enum NotificationMessage {
    COMMENT("님이 댓글을 남겼습니다."),
    FOLLOW("님이 당신을 팔로우합니다."),
    FOLLOW_REQUEST("님이 팔로우를 요청하였습니다."),
    WEBRTC("님이 화상채팅을 요청하였습니다."),
    AI_COMPLETE("이미지 생성이 완료되었습니다.");

    private String message;
    private NotificationMessage(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
