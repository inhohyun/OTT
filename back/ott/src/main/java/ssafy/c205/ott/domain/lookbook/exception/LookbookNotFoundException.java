package ssafy.c205.ott.domain.lookbook.exception;

public class LookbookNotFoundException extends RuntimeException {

    @Override
    public String getMessage() {
        return LookbookExceptionMessage.LOOKBOOK_NOT_FOUND.getMessage();
    }

    public int getStatus() {
        return LookbookExceptionMessage.LOOKBOOK_NOT_FOUND.getStatus();
    }
}
