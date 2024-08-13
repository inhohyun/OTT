package ssafy.c205.ott.domain.item.exception;

public class ImageNotFoundException extends RuntimeException {

    @Override
    public String getMessage() {
        return ItemExceptionMessage.IMAGE_NOT_FOUND.getMessage();
    }

    public int getStatus() {
        return ItemExceptionMessage.IMAGE_NOT_FOUND.getStatus();
    }
}
