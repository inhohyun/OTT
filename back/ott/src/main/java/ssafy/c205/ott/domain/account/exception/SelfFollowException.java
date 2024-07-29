package ssafy.c205.ott.domain.account.exception;

public class SelfFollowException extends RuntimeException {

    @Override
    public String getMessage() {
        return MemberExceptionMessage.SELF_FOLLOW.getMessage();
    }

    public int getStatus() {
        return MemberExceptionMessage.SELF_FOLLOW.getStatus();
    }
}
