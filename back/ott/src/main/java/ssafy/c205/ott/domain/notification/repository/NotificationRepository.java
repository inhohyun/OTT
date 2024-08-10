package ssafy.c205.ott.domain.notification.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.c205.ott.domain.notification.entity.Notification;
import ssafy.c205.ott.domain.notification.entity.NotificationStatus;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByMemberIdAndNotificationStatusOrderByCreatedAtDesc(Long memberId, NotificationStatus notificationStatus);
}
