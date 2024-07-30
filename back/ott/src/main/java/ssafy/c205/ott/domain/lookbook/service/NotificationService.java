package ssafy.c205.ott.domain.lookbook.service;

import java.util.List;
import ssafy.c205.ott.domain.lookbook.dto.requestdto.NotificationCreateDto;
import ssafy.c205.ott.domain.lookbook.dto.requestdto.NotificationSelectDto;
import ssafy.c205.ott.domain.lookbook.dto.responsedto.NotificationDto;

public interface NotificationService {
    void readNotification(String notificationId);
    void deleteNotification(String notificationId);
    void createNotification(NotificationCreateDto notificationCreateDto);
    List<NotificationDto> getNotifications(NotificationSelectDto notificationSelectDto);
}
