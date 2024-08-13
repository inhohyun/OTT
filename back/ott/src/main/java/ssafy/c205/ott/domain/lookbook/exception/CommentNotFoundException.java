package ssafy.c205.ott.domain.lookbook.exception;

public class CommentNotFoundException extends RuntimeException {

    @Override
    public String getMessage() {
        return CommentExceptionMessage.COMMENT_NOT_FOUND.getMessage();
    }

    public int getStatus() {
        return CommentExceptionMessage.COMMENT_NOT_FOUND.getStatus();
    }

}
