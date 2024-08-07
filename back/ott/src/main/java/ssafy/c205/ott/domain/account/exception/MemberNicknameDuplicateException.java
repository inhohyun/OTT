package ssafy.c205.ott.domain.account.exception;


public class MemberNicknameDuplicateException extends RuntimeException {
    @Override
    public String getMessage() {
        return MemberExceptionMessage.MEMBER_NICKNAME_DUPLICATE.getMessage();
    }

    public int getStatus() {
        return MemberExceptionMessage.MEMBER_NICKNAME_DUPLICATE.getStatus();
    }
}
