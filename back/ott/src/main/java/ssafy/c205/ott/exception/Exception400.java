package ssafy.c205.ott.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class Exception400 extends RuntimeException {
    private String field;
    private String message;

    public Exception400(String field, String message) {
        super(String.format("Invalid request: %s - %s", field, message));
        this.field = field;
        this.message = message;
    }

    public String getField() {
        return field;
    }

    public String getMessage() {
        return message;
    }
}
