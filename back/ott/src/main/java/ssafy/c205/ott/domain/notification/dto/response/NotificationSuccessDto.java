package ssafy.c205.ott.domain.notification.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class NotificationSuccessDto {
    private final String message = "알림이 완성되었습니다.";
    private final Long notificationId;
}
