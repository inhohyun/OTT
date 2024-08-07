package ssafy.c205.ott.domain.ai.exception;

public class AiBadRequestException extends RuntimeException {

    @Override
    public String getMessage() {
        return AiExceptionMessage.BAD_REQUEST.getMessage();
    }

    public int getStatus() {
        return AiExceptionMessage.BAD_REQUEST.getStatus();
    }
}
