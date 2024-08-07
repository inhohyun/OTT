package ssafy.c205.ott.domain.account.exception;

public class AlreadyFollowException extends RuntimeException{
    @Override
    public String getMessage() {
        return MemberExceptionMessage.ALREADY_FOLLOW.getMessage();
    }

    public int getStatus() {
        return MemberExceptionMessage.ALREADY_FOLLOW.getStatus();
    }
}
