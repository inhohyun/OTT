package ssafy.c205.ott.domain.lookbook.dto.responsedto;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import ssafy.c205.ott.domain.lookbook.entity.NotificationStatus;

@Getter
@ToString
public class NotificationDto {

    private Long id;
    private String massage;
    private NotificationStatus notificationStatus;
    private Long commentId;

    @Builder
    public NotificationDto(Long id, String massage, NotificationStatus notificationStatus,
        Long commentId) {
        this.id = id;
        this.massage = massage;
        this.notificationStatus = notificationStatus;
        this.commentId = commentId;
    }
}
