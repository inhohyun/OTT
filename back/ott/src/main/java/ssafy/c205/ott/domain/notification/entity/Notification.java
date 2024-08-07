package ssafy.c205.ott.domain.notification.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import org.antlr.v4.runtime.misc.NotNull;
import ssafy.c205.ott.domain.lookbook.entity.Comment;

@Entity @Getter
public class Notification {
    //Todo: 알림을 통해서 comment로 이동했을 때, comment가 삭제되었다면 예외처리

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String message;

    @Enumerated(EnumType.STRING)
    NotificationStatus notificationStatus = NotificationStatus.UNREAD;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "comment_id")
    private Comment comment;

    private Long memberid;

    @Builder
    public Notification(Long id, String message, NotificationStatus notificationStatus, Comment comment, Long memberid) {
        this.id = id;
        this.message = message;
        this.notificationStatus = notificationStatus;
        this.comment = comment;
        this.memberid = memberid;
    }

    public Notification() {

    }
}
