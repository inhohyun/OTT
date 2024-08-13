package ssafy.c205.ott.domain.notification.dto.response;

import lombok.Builder;

@Builder
public class DeleteNotificationSuccessDto {
    private final String message = "알림 삭제가 완료되었습니다.";
}
