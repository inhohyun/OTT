package ssafy.c205.ott.domain.notification.service;

import static ssafy.c205.ott.domain.notification.util.NotificationMessage.*;

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
import ssafy.c205.ott.domain.notification.entity.AiNotification;
import ssafy.c205.ott.domain.notification.entity.CommentNotification;
import ssafy.c205.ott.domain.notification.entity.FollowNotification;
import ssafy.c205.ott.domain.notification.entity.Notification;
import ssafy.c205.ott.domain.notification.entity.NotificationStatus;
import ssafy.c205.ott.domain.notification.entity.NotificationType;
import ssafy.c205.ott.domain.notification.entity.WebRtcNotification;
import ssafy.c205.ott.domain.notification.repository.NotificationRepository;

@Service
@Transactional
@RequiredArgsConstructor
public class NotificationWriteService {

    private final NotificationRepository notificationRepository;
    private final MemberReadService memberReadService;

    public NotificationSuccessDto createCommentNotification(CommentNotificationDto commentNotificationDto) {
        Notification commentNotification = CommentNotification.builder()
                .message(commentNotificationDto.getCommentAuthorName() + COMMENT.getMessage())
                .notificationType(commentNotificationDto.getNotificationType())
                .notificationStatus(NotificationStatus.UNREAD)
                .memberId(commentNotificationDto.getMemberId())
                .lookbookId(commentNotificationDto.getLookbookId())
                .commentId(commentNotificationDto.getCommentId())
                .commentAuthorId(commentNotificationDto.getCommentAuthorId())
                .build();
        Notification notification = notificationRepository.save(commentNotification);
        return NotificationSuccessDto.builder().notificationId(notification.getId()).build();
    }

    public NotificationSuccessDto createFollowNotification(FollowNotificationDto followNotificationDto) {
        String message = followNotificationDto.getFollowerName() +
                (followNotificationDto.getFollowStatus() == FollowStatus.FOLLOWING ? FOLLOW.getMessage() : FOLLOW_REQUEST.getMessage());

        Notification followNotification = FollowNotification.builder()
                .message(message)
                .notificationType(followNotificationDto.getNotificationType())
                .notificationStatus(NotificationStatus.UNREAD)
                .memberId(followNotificationDto.getMemberId())
                .followerId(followNotificationDto.getFollowerId())
                .followId(followNotificationDto.getFollowId())
                .build();
        Notification notification = notificationRepository.save(followNotification);
        return NotificationSuccessDto.builder().notificationId(notification.getId()).build();
    }

    public NotificationSuccessDto createWebRtcNotification(WebRtcNotificationDto webRtcNotificationDto) {
        MemberNotificationDto memberInfo = memberReadService.myInfoSearch(MemberSsoDto.builder().sso(webRtcNotificationDto.getRtcRequestMemberSso()).build());

        Notification webRtcNotification = WebRtcNotification.builder()
                .message(memberInfo.getMemberName() + COMMENT.getMessage())
                .notificationType(webRtcNotificationDto.getNotificationType())
                .notificationStatus(NotificationStatus.UNREAD)
                .memberId(webRtcNotificationDto.getMemberId())
                .rtcRequestMemberId(memberInfo.getMemberId())
                .sessionId(webRtcNotificationDto.getSessionId())
                .build();
        Notification notification = notificationRepository.save(webRtcNotification);
        return NotificationSuccessDto.builder().notificationId(notification.getId()).build();
    }

    public NotificationSuccessDto createAiNotification(AiNotificationDto aiNotificationDto){
        Notification aiNotification = AiNotification.builder()
                .message(AI_COMPLETE.getMessage())
                .notificationType(NotificationType.AI)
                .notificationStatus(NotificationStatus.UNREAD)
                .memberId(aiNotificationDto.getMemberId())
                .build();
        Notification notification = notificationRepository.save(aiNotification);
        return NotificationSuccessDto.builder().notificationId(notification.getId()).build();
    }

    public DeleteNotificationSuccessDto deleteNotification(Long notificationId){
        notificationRepository.deleteById(notificationId);
        return DeleteNotificationSuccessDto.builder().build();
    }
}
