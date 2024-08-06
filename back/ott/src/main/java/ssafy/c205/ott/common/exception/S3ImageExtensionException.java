package ssafy.c205.ott.common.exception;

public class S3ImageExtensionException extends RuntimeException {

    @Override
    public String getMessage() {
        return S3ExceptionMessage.NOT_IMAGE_EXTENSION.getMessage();
    }

    public int getStatus() {
        return S3ExceptionMessage.NOT_IMAGE_EXTENSION.getStatus();
    }
}
