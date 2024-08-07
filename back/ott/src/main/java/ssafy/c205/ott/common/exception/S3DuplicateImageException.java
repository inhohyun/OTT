package ssafy.c205.ott.common.exception;

public class S3DuplicateImageException extends RuntimeException {

    @Override
    public String getMessage() {
        return S3ExceptionMessage.DUPLICATE_IMAGE.getMessage();
    }

    public int getStatus() {
        return S3ExceptionMessage.DUPLICATE_IMAGE.getStatus();
    }
}
