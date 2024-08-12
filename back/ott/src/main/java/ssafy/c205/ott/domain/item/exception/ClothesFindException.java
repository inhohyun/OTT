package ssafy.c205.ott.domain.item.exception;

public class ClothesFindException extends RuntimeException {

    @Override
    public String getMessage() {
        return ItemExceptionMessage.CLOTHES_NOT_FOUND.getMessage();
    }

    public int getStatus() {
        return ItemExceptionMessage.CLOTHES_NOT_FOUND.getStatus();
    }
}
