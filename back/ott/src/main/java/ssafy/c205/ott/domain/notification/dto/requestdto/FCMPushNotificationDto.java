package ssafy.c205.ott.domain.notification.dto.requestdto;

import lombok.Getter;

@Getter
public class FCMPushNotificationDto {
    private Long memberId;
    private String title;
    private String body;
}
