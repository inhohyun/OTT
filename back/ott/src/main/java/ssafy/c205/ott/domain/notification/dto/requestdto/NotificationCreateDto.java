package ssafy.c205.ott.domain.notification.dto.requestdto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter
@ToString @Builder
public class NotificationCreateDto {
    private String commentId;
    private Long memberid;

    @Builder
    public NotificationCreateDto(String commentId, Long memberid) {
        this.commentId = commentId;
        this.memberid = memberid;
    }
}
