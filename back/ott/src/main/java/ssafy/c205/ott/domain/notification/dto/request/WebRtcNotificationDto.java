package ssafy.c205.ott.domain.notification.dto.request;

import lombok.Builder;
import lombok.Getter;
import ssafy.c205.ott.domain.notification.entity.NotificationType;

@Getter
@Builder
public class WebRtcNotificationDto {

    private NotificationType notificationType;
    private Long memberId;
    private String sessionId;
    private String rtcRequestMemberSso;
}
