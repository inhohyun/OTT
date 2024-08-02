package ssafy.c205.ott.domain.category.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum CategoryExceptionMessage {
    CATEGORY_NOT_FOUND("카테고리가 존재하지 않습니다.", HttpStatus.NOT_FOUND.value()),;

    private final String message;
    private final int status;
}
