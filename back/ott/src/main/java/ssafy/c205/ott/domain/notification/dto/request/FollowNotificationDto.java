package ssafy.c205.ott.domain.notification.dto.request;

import lombok.Getter;
import lombok.experimental.SuperBuilder;
import ssafy.c205.ott.domain.account.entity.FollowStatus;
import ssafy.c205.ott.domain.notification.entity.NotificationType;

@Getter
@SuperBuilder
public class FollowNotificationDto {

    private NotificationType notificationType;
    private Long memberId;
    private Long followerId;
    private Long followId;
    private String followerName;
    private FollowStatus followStatus;
}
