package ssafy.c205.ott.domain.notification.dto.responsedto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import ssafy.c205.ott.domain.notification.entity.NotificationStatus;

@Getter @Setter
@ToString @Builder
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
