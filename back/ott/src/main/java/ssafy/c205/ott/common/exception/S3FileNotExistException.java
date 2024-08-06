package ssafy.c205.ott.common.exception;

public class S3FileNotExistException extends RuntimeException {

    @Override
    public String getMessage() {
        return S3ExceptionMessage.NO_IMAGE_EXIST.getMessage();
    }

    public int getStatus() {
        return S3ExceptionMessage.NO_IMAGE_EXIST.getStatus();
    }
}
