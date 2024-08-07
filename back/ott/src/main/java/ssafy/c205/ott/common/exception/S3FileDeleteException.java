package ssafy.c205.ott.common.exception;

public class S3FileDeleteException extends RuntimeException {

    @Override
    public String getMessage() {
        return S3ExceptionMessage.FAIL_DELETE.getMessage();
    }

    public int getStatus() {
        return S3ExceptionMessage.FAIL_DELETE.getStatus();
    }
}
