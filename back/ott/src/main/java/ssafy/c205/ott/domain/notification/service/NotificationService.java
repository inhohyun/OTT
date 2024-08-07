package ssafy.c205.ott.domain.notification.service;

import java.util.List;
import ssafy.c205.ott.domain.notification.dto.requestdto.NotificationCreateDto;
import ssafy.c205.ott.domain.notification.dto.requestdto.NotificationSelectDto;
import ssafy.c205.ott.domain.notification.dto.responsedto.NotificationDto;
import ssafy.c205.ott.domain.notification.util.NotificationMessage;

public interface NotificationService {
    void readNotification(String notificationId);
    void deleteNotification(String notificationId);
    void createCommentNotification(NotificationCreateDto notificationCreateDto);
    void createNotification(NotificationMessage message, Long memberId);
    List<NotificationDto> getNotifications(NotificationSelectDto notificationSelectDto);
}
