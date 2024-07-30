package ssafy.c205.ott.domain.lookbook.service;

import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ssafy.c205.ott.domain.lookbook.dto.requestdto.NotificationCreateDto;
import ssafy.c205.ott.domain.lookbook.entity.Comment;
import ssafy.c205.ott.domain.lookbook.entity.Notification;
import ssafy.c205.ott.domain.lookbook.entity.NotificationStatus;
import ssafy.c205.ott.domain.lookbook.repository.CommentRepository;
import ssafy.c205.ott.domain.lookbook.repository.NotificationRepository;

@Service
@Slf4j
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final CommentRepository commentRepository;

    @Override
    public void readNotification(String notificationId) {
        notificationRepository.save(Notification
            .builder()
            .id(Long.parseLong(notificationId))
            .notificationStatus(NotificationStatus.READ)
            .build());
        //Todo : 알림 읽음처리가 잘 되었는지 확인하여 예외처리
    }

    @Override
    public void deleteNotification(String notificationId) {
        notificationRepository.save(Notification
            .builder()
            .id(Long.parseLong(notificationId))
            .notificationStatus(NotificationStatus.DELETE)
            .build());
        //Todo : 알림 삭제처리가 잘 되었는지 확인하여 예외처리
    }

    @Override
    public void createNotification(NotificationCreateDto notificationCreateDto) {
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
            .message(comment.getMember().getNickname() + "님이 댓글을 남겼습니다.")
            .build());
    }
}
