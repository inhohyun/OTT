package ssafy.c205.ott.domain.item.exception;

import ssafy.c205.ott.domain.account.exception.MemberExceptionMessage;

public class ItemCategoryNotFoundException extends RuntimeException {
    @Override
    public String getMessage() {
        return ItemCategoryExceptionMessage.ITEM_CATEGORY_NOT_FOUND_MESSAGE.getMessage();
    }

    public int getStatus() {
        return ItemCategoryExceptionMessage.ITEM_CATEGORY_NOT_FOUND_MESSAGE.getStatus();
    }
}
