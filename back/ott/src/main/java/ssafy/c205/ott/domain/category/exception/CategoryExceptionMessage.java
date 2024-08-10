package ssafy.c205.ott.domain.category.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum CategoryExceptionMessage {
    CATEGORY_NOT_FOUND("카테고리가 존재하지 않습니다.", HttpStatus.NOT_FOUND.value()),
    CATEGORY_ALREADY_USE("카테고리에 속한 옷이 있습니다.", HttpStatus.BAD_REQUEST.value()),
    CATEGORY_NAME_DUPLICATION("이미 존재하는 카테고리입니다.", HttpStatus.BAD_REQUEST.value());

    private final String message;
    private final int status;
}
