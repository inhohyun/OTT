package ssafy.c205.ott.domain.item.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ItemCategoryExceptionMessage {
    ITEM_CATEGORY_NOT_FOUND_MESSAGE("ItemCategory가 존재하지 않습니다.", HttpStatus.BAD_REQUEST.value()),;

    private final String message;
    private final int status;

    ItemCategoryExceptionMessage(String message, int status) {
        this.message = message;
        this.status = status;
    }
}
