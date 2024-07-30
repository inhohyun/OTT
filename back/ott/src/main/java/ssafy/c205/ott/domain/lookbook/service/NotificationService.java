package ssafy.c205.ott.domain.lookbook.service;

import ssafy.c205.ott.domain.lookbook.dto.requestdto.NotificationCreateDto;

public interface NotificationService {
    void readNotification(String notificationId);
    void deleteNotification(String notificationId);
    void createNotification(NotificationCreateDto notificationCreateDto);

}
