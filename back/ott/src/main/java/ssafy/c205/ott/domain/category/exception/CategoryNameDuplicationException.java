package ssafy.c205.ott.domain.category.exception;

public class CategoryNameDuplicationException extends RuntimeException {
    @Override
    public String getMessage() {
        return CategoryExceptionMessage.CATEGORY_NAME_DUPLICATION.getMessage();
    }

    public int getStatus() {
        return CategoryExceptionMessage.CATEGORY_NAME_DUPLICATION.getStatus();
    }
}
