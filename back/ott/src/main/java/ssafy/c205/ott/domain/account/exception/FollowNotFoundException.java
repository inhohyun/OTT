package ssafy.c205.ott.domain.account.exception;

public class FollowNotFoundException extends RuntimeException {
    @Override
    public String getMessage() {
        return MemberExceptionMessage.FOLLOW_REQUEST_NOT_FOUND_MESSAGE.getMessage();
    }

    public int getStatus() {
        return MemberExceptionMessage.FOLLOW_REQUEST_NOT_FOUND_MESSAGE.getStatus();
    }
}
