package ssafy.c205.ott.domain.notification.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.c205.ott.domain.notification.dto.response.NotificationResponseDto;
import ssafy.c205.ott.domain.notification.entity.*;
import ssafy.c205.ott.domain.notification.exception.NotificationNotFoundException;
import ssafy.c205.ott.domain.notification.repository.NotificationRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class NotificationReadService {
    private final NotificationRepository notificationRepository;

    public List<NotificationResponseDto> searchNotification(Long memberId) {
        List<Notification> notifications = notificationRepository.findByMemberIdAndNotificationStatusOrderByCreatedAtDesc(memberId, NotificationStatus.UNREAD);

        notifications.forEach(notification -> notification.updateNotificationStatus(NotificationStatus.READ));
        notificationRepository.saveAll(notifications);

        return notifications.stream()
                .map(this::buildNotificationResponseDto)
                .collect(Collectors.toList());
    }

    public NotificationResponseDto sendNotification(Long memberId) {
        Notification notification = notificationRepository.findFirstByMemberIdAndNotificationStatusOrderByCreatedAtAsc(memberId,
                NotificationStatus.UNREAD).orElseThrow(NotificationNotFoundException::new);
        notification.updateNotificationStatus(NotificationStatus.READ);
        notificationRepository.save(notification);
        return buildNotificationResponseDto(notification);
    }

    private NotificationResponseDto buildNotificationResponseDto(Notification notification) {

        return NotificationResponseDto.builder()
                .notificationId(notification.getId())
                .notificationType(notification.getNotificationType())
                .message(notification.getMessage())
                .createdAt(notification.getCreatedAt())
                .additionalData(notification.getAdditionalData())
                .build();
    }
}
