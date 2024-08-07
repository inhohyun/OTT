package ssafy.c205.ott.domain.category.exception;

public class CategoryNotFoundException extends RuntimeException {
    @Override
    public String getMessage() {
        return CategoryExceptionMessage.CATEGORY_NOT_FOUND.getMessage();
    }

    public int getStatus() {
        return CategoryExceptionMessage.CATEGORY_NOT_FOUND.getStatus();
    }
}
