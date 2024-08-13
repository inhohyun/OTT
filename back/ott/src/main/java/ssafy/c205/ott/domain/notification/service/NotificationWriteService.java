package ssafy.c205.ott.domain.notification.service;

import static ssafy.c205.ott.domain.notification.util.NotificationMessage.*;

import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.c205.ott.domain.account.dto.request.MemberSsoDto;
import ssafy.c205.ott.domain.account.dto.response.MemberNotificationDto;
import ssafy.c205.ott.domain.account.entity.FollowStatus;
import ssafy.c205.ott.domain.account.service.MemberReadService;
import ssafy.c205.ott.domain.notification.dto.request.AiNotificationDto;
import ssafy.c205.ott.domain.notification.dto.request.CommentNotificationDto;
import ssafy.c205.ott.domain.notification.dto.request.FollowNotificationDto;
import ssafy.c205.ott.domain.notification.dto.request.WebRtcNotificationDto;
import ssafy.c205.ott.domain.notification.dto.response.DeleteNotificationSuccessDto;
import ssafy.c205.ott.domain.notification.dto.response.NotificationSuccessDto;
import ssafy.c205.ott.domain.notification.entity.Notification;
import ssafy.c205.ott.domain.notification.entity.NotificationStatus;
import ssafy.c205.ott.domain.notification.entity.NotificationType;
import ssafy.c205.ott.domain.notification.repository.NotificationRepository;

@Service
@Transactional
@RequiredArgsConstructor
public class NotificationWriteService {

    private final NotificationRepository notificationRepository;
    private final MemberReadService memberReadService;

    public NotificationSuccessDto createCommentNotification(CommentNotificationDto commentNotificationDto) {
        Map<String, Object> additionalData = new HashMap<>();
        additionalData.put("lookbookId", commentNotificationDto.getLookbookId());
        additionalData.put("commentId", commentNotificationDto.getCommentId());
        additionalData.put("commentAuthorId", commentNotificationDto.getCommentAuthorId());

        Notification commentNotification = buildNotification(
                commentNotificationDto.getCommentAuthorName() + COMMENT.getMessage(),
                commentNotificationDto.getNotificationType(),
                commentNotificationDto.getMemberId(), additionalData);

        Notification notification = notificationRepository.save(commentNotification);
        return NotificationSuccessDto.builder().notificationId(notification.getId()).build();
    }

    public NotificationSuccessDto createFollowNotification(FollowNotificationDto followNotificationDto) {
        String message = followNotificationDto.getFollowerName() +
                (followNotificationDto.getFollowStatus() == FollowStatus.FOLLOWING ? FOLLOW.getMessage() : FOLLOW_REQUEST.getMessage());

        Map<String, Object> additionalData = new HashMap<>();
        additionalData.put("followerId", followNotificationDto.getFollowerId());
        additionalData.put("followId", followNotificationDto.getFollowId());

        Notification followNotification = buildNotification(message, followNotificationDto.getNotificationType(),
                followNotificationDto.getMemberId(), additionalData);

        Notification notification = notificationRepository.save(followNotification);
        return NotificationSuccessDto.builder().notificationId(notification.getId()).build();
    }

    public NotificationSuccessDto createWebRtcNotification(WebRtcNotificationDto webRtcNotificationDto) {
        MemberNotificationDto memberInfo = memberReadService.myInfoSearch(MemberSsoDto.builder().sso(webRtcNotificationDto.getRtcRequestMemberSso()).build());

        Map<String, Object> additionalData = new HashMap<>();
        additionalData.put("rtcRequestMemberId", memberInfo.getMemberId());
        additionalData.put("sessionId", webRtcNotificationDto.getSessionId());

        Notification webRtcNotification = buildNotification(memberInfo.getMemberName() + COMMENT.getMessage(), webRtcNotificationDto.getNotificationType(), webRtcNotificationDto.getMemberId(), additionalData);

        Notification notification = notificationRepository.save(webRtcNotification);
        return NotificationSuccessDto.builder().notificationId(notification.getId()).build();
    }

    public NotificationSuccessDto createAiNotification(AiNotificationDto aiNotificationDto){
        Notification aiNotification = buildNotification(AI_COMPLETE.getMessage(), NotificationType.AI, aiNotificationDto.getMemberId(), null);

        Notification notification = notificationRepository.save(aiNotification);
        return NotificationSuccessDto.builder().notificationId(notification.getId()).build();
    }

    public DeleteNotificationSuccessDto deleteNotification(Long notificationId){
        notificationRepository.deleteById(notificationId);
        return DeleteNotificationSuccessDto.builder().build();
    }

    private Notification buildNotification(String message, NotificationType notificationType, Long memberId, Map<String, Object> additionalData) {
        return Notification.builder()
                .message(message)
                .notificationType(notificationType)
                .notificationStatus(NotificationStatus.UNREAD)
                .memberId(memberId)
                .additionalData(additionalData)
                .build();
    }
}
