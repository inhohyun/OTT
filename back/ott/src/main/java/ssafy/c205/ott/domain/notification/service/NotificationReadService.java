package ssafy.c205.ott.domain.notification.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
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
    private final ObjectMapper objectMapper = new ObjectMapper(); // 클래스 필드로 ObjectMapper를 선언

    public List<NotificationResponseDto> searchNotification(Long memberId) {
        List<Notification> notifications = notificationRepository.findByMemberIdAndNotificationStatusOrderByCreatedAtDesc(memberId, NotificationStatus.UNREAD);

        notifications.forEach(notification -> notification.updateNotificationStatus(NotificationStatus.READ));
        notificationRepository.saveAll(notifications);

        return notifications.stream()
                .map(this::buildNotificationResponseDto)
                .collect(Collectors.toList());
    }

    public NotificationResponseDto sendNotification(Long memberId) {
        Notification notification = notificationRepository.findFirstByMemberIdAndNotificationStatusAndOrderByCreatedAtAsc(memberId,
                NotificationStatus.UNREAD).orElseThrow(NotificationNotFoundException::new);
        return buildNotificationResponseDto(notification);
    }

    private NotificationResponseDto buildNotificationResponseDto(Notification notification) {
        ObjectNode node = objectMapper.createObjectNode();

        switch (notification.getNotificationType()) {
            case FOLLOW:
                node.put("followId", ((FollowNotification) notification).getFollowId());
                break;
            case COMMENT:
                node.put("commentId", ((CommentNotification) notification).getCommentId());
                break;
            case RTC:
                node.put("sessionId", ((WebRtcNotification) notification).getSessionId());
                break;
            case AI:
                node.put("aiId", ((AiNotification) notification).getId());
                break;
            default:
                throw new NotificationNotFoundException();
        }

        return NotificationResponseDto.builder()
                .notificationId(notification.getId())
                .notificationType(notification.getNotificationType())
                .message(notification.getMessage())
                .createdAt(notification.getCreatedAt())
                .additionalData(node)
                .build();
    }
}
