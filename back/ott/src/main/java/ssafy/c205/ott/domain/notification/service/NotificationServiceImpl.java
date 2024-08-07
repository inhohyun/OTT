package ssafy.c205.ott.domain.notification.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ssafy.c205.ott.domain.notification.dto.requestdto.NotificationCreateDto;
import ssafy.c205.ott.domain.notification.dto.requestdto.NotificationSelectDto;
import ssafy.c205.ott.domain.notification.dto.responsedto.NotificationDto;
import ssafy.c205.ott.domain.lookbook.entity.Comment;
import ssafy.c205.ott.domain.notification.entity.Notification;
import ssafy.c205.ott.domain.notification.util.NotificationMessage;
import ssafy.c205.ott.domain.notification.entity.NotificationStatus;
import ssafy.c205.ott.domain.lookbook.repository.CommentRepository;
import ssafy.c205.ott.domain.notification.repository.NotificationRepository;

@Service
@Slf4j
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final CommentRepository commentRepository;

    @Override
    public void readNotification(String notificationId) {
        Optional<Notification> on = notificationRepository.findById(Long.parseLong(notificationId));
        Notification notification = null;
        if (on.isPresent()) {
            notification = on.get();
        }
        notificationRepository.save(Notification
                .builder()
                .id(Long.parseLong(notificationId))
                .notificationStatus(NotificationStatus.READ)
                .memberid(notification.getMemberid())
                .comment(notification.getComment())
                .message(notification.getMessage())
                .build());
        //Todo : 알림 읽음처리가 잘 되었는지 확인하여 예외처리
    }

    @Override
    public void deleteNotification(String notificationId) {
        Optional<Notification> bn = notificationRepository.findById(
            Long.parseLong(notificationId));
        Notification notification = null;
        if (bn.isPresent()) {
            notification = bn.get();
        }
        notificationRepository.save(Notification
            .builder()
            .id(Long.parseLong(notificationId))
            .notificationStatus(NotificationStatus.READ)
            .memberid(notification.getId())
            .comment(notification.getComment())
            .message(notification.getMessage())
            .build());
        //Todo : 알림 삭제처리가 잘 되었는지 확인하여 예외처리
    }

    @Override
    public void createCommentNotification(NotificationCreateDto notificationCreateDto) {
        Comment comment = null;
        Optional<Comment> oc = commentRepository.findById(
                Long.parseLong(notificationCreateDto.getCommentId()));
        //Todo : 댓글 조회를 실패했을때의 예외처리
        if (oc.isPresent()) {
            comment = oc.get();
        }

        notificationRepository.save(Notification
                .builder()
                .notificationStatus(NotificationStatus.UNREAD)
                .comment(comment)
                .message(comment.getMember().getNickname() + NotificationMessage.COMMENT.getMessage())
                .memberid(comment.getMember().getId())
                .build());
    }

    @Override
    public void createNotification(NotificationMessage message, Long memberId) {
        notificationRepository.save(Notification
                .builder()
                .notificationStatus(NotificationStatus.UNREAD)
                .message(message.getMessage())
                .memberid(memberId)
                .build());
    }

    @Override
    public List<NotificationDto> getNotifications(NotificationSelectDto notificationSelectDto) {
        //Todo : Delete된 알림은 가져오지 말것
        List<NotificationDto> notifications = new ArrayList<>();
        List<Notification> notificationArr = notificationRepository.findByMemberidOrderByIdDesc(Long.parseLong(notificationSelectDto.getUid()));

        for (Notification notification : notificationArr) {
            notifications.add(NotificationDto
                    .builder()
                    .notificationStatus(notification.getNotificationStatus())
                    .commentId(notification.getComment().getId())
                    .massage(notification.getMessage())
                    .id(notification.getId())
                    .build());
        }
        return notifications;
    }
}
