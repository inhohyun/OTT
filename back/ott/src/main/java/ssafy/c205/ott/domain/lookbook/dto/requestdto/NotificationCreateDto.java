package ssafy.c205.ott.domain.lookbook.dto.requestdto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter
@ToString @Builder
public class NotificationCreateDto {
    private String commentId;

    @Builder
    public NotificationCreateDto(String commentId) {
        this.commentId = commentId;
    }
}
