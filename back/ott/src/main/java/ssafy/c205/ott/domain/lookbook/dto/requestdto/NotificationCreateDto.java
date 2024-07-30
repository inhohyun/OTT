package ssafy.c205.ott.domain.lookbook.dto.requestdto;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter @ToString
public class NotificationCreateDto {
    private String commentId;

    @Builder
    public NotificationCreateDto(String commentId) {
        this.commentId = commentId;
    }
}
