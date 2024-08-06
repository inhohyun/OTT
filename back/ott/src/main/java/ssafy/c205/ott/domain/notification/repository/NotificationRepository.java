package ssafy.c205.ott.domain.notification.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ssafy.c205.ott.domain.notification.entity.Notification;
import ssafy.c205.ott.domain.notification.entity.NotificationStatus;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    @Query("SELECT n FROM Notification n WHERE n.comment.member.id = :userid AND n.notificationStatus IN :statuses ORDER BY n.id DESC")
    List<Notification> findByCommentMemberUserIdAndNotificationStatusInOrderByIdDesc(
        @Param("userid") String userid,
        @Param("statuses") List<NotificationStatus> statuses
    );
}
