package ssafy.c205.ott.common.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import ssafy.c205.ott.common.ApiResponse;
import ssafy.c205.ott.domain.account.exception.MemberNicknameDuplicateException;
import ssafy.c205.ott.domain.account.exception.MemberNotFoundException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // 400 - Bad Request
    @ExceptionHandler(MemberNicknameDuplicateException.class)
    public ResponseEntity<ApiResponse<Void>> handleMemberNicknameDuplicateException(MemberNicknameDuplicateException e) {
        ApiResponse<Void> response = ApiResponse.error(e.getStatus(), e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    // 404 - Not Found
    @ExceptionHandler(MemberNotFoundException.class)
    public ResponseEntity<ApiResponse<Void>> handleMemberNotFoundException(MemberNotFoundException e) {
        ApiResponse<Void> response = ApiResponse.error(e.getStatus(), e.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }

//    // 500 - Internal Server Error
//    @ExceptionHandler(Exception.class)
//    public ResponseEntity<ApiResponse<Void>> handleGenericException(Exception e) {
//        ApiResponse<Void> response = ApiResponse.error(HttpStatus.INTERNAL_SERVER_ERROR.value(), "예상하지 못한 서버 오류가 발생했습니다.");
//        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
//    }
}