package ssafy.c205.ott.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public class Exception500 extends RuntimeException {
    private String message;

    public Exception500(String message) {
        super(message);
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
