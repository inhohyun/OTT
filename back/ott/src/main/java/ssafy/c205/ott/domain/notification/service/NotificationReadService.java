package ssafy.c205.ott.domain.notification.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.c205.ott.domain.notification.dto.response.NotificationResponseDto;
import ssafy.c205.ott.domain.notification.entity.*;
import ssafy.c205.ott.domain.notification.repository.NotificationRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class NotificationReadService {
    private final NotificationRepository notificationRepository;

    public List<NotificationResponseDto> searchNotification(Long memberId){
        List<Notification> notifications = notificationRepository.findByMemberIdAndNotificationStatusOrderByCreatedAtDesc(memberId, NotificationStatus.UNREAD);

        notifications.forEach(notification -> notification.updateNotificationStatus(NotificationStatus.READ));

        // 변경된 상태를 데이터베이스에 저장
        notificationRepository.saveAll(notifications);

        return notifications.stream()
                .map(notification -> {
                    switch (notification.getNotificationType()) {
                        case FOLLOW:
                            return buildFollowResponseDto(notification);
                        case COMMENT:
                            return buildCommentResponseDto(notification);
                        case RTC:
                            return buildRtcResponseDto(notification);
                        case AI:
                            return buildAiResponseDto(notification);
                        default:
                            throw new IllegalArgumentException("Unknown NotificationType: " + notification.getNotificationType());
                    }
                })
                .collect(Collectors.toList());
    }

    private NotificationResponseDto buildFollowResponseDto(Notification notification){
        FollowNotification followNotification = (FollowNotification) notification;
        // ObjectMapper 인스턴스 생성
        ObjectMapper objectMapper = new ObjectMapper();

        // JsonNode 객체 생성
        ObjectNode node = objectMapper.createObjectNode();
        node.put("followId", followNotification.getFollowId());

        return NotificationResponseDto.builder()
                .notificationId(followNotification.getId())
                .notificationType(followNotification.getNotificationType())
                .message(followNotification.getMessage())
                .createdAt(followNotification.getCreatedAt())
                .additionalData(node)
                .build();
    }

    private NotificationResponseDto buildCommentResponseDto(Notification notification){
        CommentNotification commentNotification = (CommentNotification) notification;
        ObjectMapper objectMapper = new ObjectMapper();

        ObjectNode node = objectMapper.createObjectNode();
        node.put("commentId", commentNotification.getCommentId());

        return NotificationResponseDto.builder()
                .notificationId(commentNotification.getId())
                .notificationType(commentNotification.getNotificationType())
                .message(commentNotification.getMessage())
                .createdAt(commentNotification.getCreatedAt())
                .additionalData(node)
                .build();
    }

    private NotificationResponseDto buildRtcResponseDto(Notification notification){
        WebRtcNotification webRtcNotification = (WebRtcNotification) notification;
        ObjectMapper objectMapper = new ObjectMapper();

        ObjectNode node = objectMapper.createObjectNode();
        node.put("sessionId", webRtcNotification.getSessionId());

        return NotificationResponseDto.builder()
                .notificationId(webRtcNotification.getId())
                .notificationType(webRtcNotification.getNotificationType())
                .message(webRtcNotification.getMessage())
                .createdAt(webRtcNotification.getCreatedAt())
                .additionalData(node)
                .build();
    }

    private NotificationResponseDto buildAiResponseDto(Notification notification){
        AiNotification aiNotification = (AiNotification) notification;
        // ObjectMapper 인스턴스 생성
        ObjectMapper objectMapper = new ObjectMapper();

        // JsonNode 객체 생성
        ObjectNode node = objectMapper.createObjectNode();
        node.put("aiId", aiNotification.getId());

        return NotificationResponseDto.builder()
                .notificationId(aiNotification.getId())
                .notificationType(aiNotification.getNotificationType())
                .message(aiNotification.getMessage())
                .createdAt(aiNotification.getCreatedAt())
                .additionalData(node)
                .build();
    }
}
