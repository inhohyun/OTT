package ssafy.c205.ott.domain.account.exception;

public class MemberNotFoundException extends RuntimeException {
    @Override
    public String getMessage() {
        return MemberExceptionMessage.MEMBER_NOT_FOUND.getMessage();
    }
}
