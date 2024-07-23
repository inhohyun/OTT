package ssafy.c205.ott.domain.account.exception;

public enum MemberExceptionMessage {
    MEMBER_NOT_FOUND("해당 유저가 존재하지 않습니다.");

    private final String message;

    MemberExceptionMessage(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
