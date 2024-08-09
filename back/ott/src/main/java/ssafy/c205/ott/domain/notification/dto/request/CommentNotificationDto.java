package ssafy.c205.ott.domain.notification.dto.request;

import lombok.Builder;
import lombok.Getter;
import ssafy.c205.ott.domain.notification.entity.NotificationType;

@Getter
@Builder
public class CommentNotificationDto {

    private NotificationType notificationType;
    private Long memberId;
    private Long lookbookId;
    private Long commentId;
    private Long commentAuthorId;
    private String commentAuthorName;
}
