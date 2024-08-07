package ssafy.c205.ott.common.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum S3ExceptionMessage {
    NO_IMAGE_EXIST("No image exists with the provided URL", HttpStatus.BAD_REQUEST.value()),
    DUPLICATE_IMAGE("Duplicate image found", HttpStatus.BAD_REQUEST.value()),
    NOT_IMAGE_EXTENSION("Invalid image file extension", HttpStatus.BAD_REQUEST.value()),
    FAIL_UPLOAD("Failed to upload file", HttpStatus.BAD_REQUEST.value()),
    FAIL_DELETE("Failed to delete file", HttpStatus.BAD_REQUEST.value());

    private final String message;
    private final int status;

    S3ExceptionMessage(String message, int status) {
        this.message = message;
        this.status = status;
    }
}
