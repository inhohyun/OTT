package ssafy.c205.ott.domain.notification.dto.requestdto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class FCMPushNotificationDto {
    private Long memberId;
    private String title;
    private String body;
}
