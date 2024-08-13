package ssafy.c205.ott.common.oauth.exception;

public class InvalidRefreshToken extends RuntimeException {
    @Override
    public String getMessage() {
        return OAuthExceptionMessage.INVALID_REFRESH_TOKEN.getMessage();
    }
    public int getStatus() {
        return OAuthExceptionMessage.INVALID_REFRESH_TOKEN.getStatus();
    }
}
