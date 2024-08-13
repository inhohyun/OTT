package ssafy.c205.ott.domain.category.exception;

public class CategoryAlreadyUseException extends RuntimeException {
    @Override
    public String getMessage() {
        return CategoryExceptionMessage.CATEGORY_ALREADY_USE.getMessage();
    }

    public int getStatus() {
        return CategoryExceptionMessage.CATEGORY_ALREADY_USE.getStatus();
    }
}
