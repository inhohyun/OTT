package ssafy.c205.ott.domain.account.exception;

public class NotSelfRequestException extends RuntimeException {

    @Override
    public String getMessage() {
        return MemberExceptionMessage.NOT_SELF_REQUEST.getMessage();
    }
    public int getStatus() {
        return MemberExceptionMessage.NOT_SELF_REQUEST.getStatus();
    }

}
