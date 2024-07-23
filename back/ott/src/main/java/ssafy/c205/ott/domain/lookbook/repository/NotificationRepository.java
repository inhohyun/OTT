package ssafy.c205.ott.domain.lookbook.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.c205.ott.domain.lookbook.entity.Notification;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
}
