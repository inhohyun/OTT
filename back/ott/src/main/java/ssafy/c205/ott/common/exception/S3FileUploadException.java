package ssafy.c205.ott.common.exception;

public class S3FileUploadException extends RuntimeException {

    @Override
    public String getMessage() {
        return S3ExceptionMessage.FAIL_UPLOAD.getMessage();
    }

    public int getStatus() {
        return S3ExceptionMessage.FAIL_UPLOAD.getStatus();
    }
}
