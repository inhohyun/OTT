package ssafy.c205.ott.domain.lookbook.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ssafy.c205.ott.domain.lookbook.entity.Notification;
import ssafy.c205.ott.domain.lookbook.entity.NotificationStatus;
import ssafy.c205.ott.domain.lookbook.repository.NotificationRepository;

@Service
@Slf4j
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;

    @Override
    public void readNotification(String notificationId) {
        notificationRepository.save(Notification
            .builder()
            .id(Long.parseLong(notificationId))
            .notificationStatus(NotificationStatus.READ)
            .build());
        //Todo : 알림 읽음처리가 잘 되었는지 확인하여 예외처리
    }
}
