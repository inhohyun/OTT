package ssafy.c205.ott.domain.notification.dto.response;

import java.util.Map;
import lombok.Builder;
import lombok.Getter;
import ssafy.c205.ott.domain.notification.entity.NotificationType;

import java.time.LocalDateTime;

@Getter
@Builder
public class NotificationResponseDto {
    private Long notificationId;
    private NotificationType notificationType;
    private String message;
    private LocalDateTime createdAt;
    Map<String, Object> additionalData;
}
