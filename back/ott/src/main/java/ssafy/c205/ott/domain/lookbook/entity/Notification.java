package ssafy.c205.ott.domain.lookbook.entity;

import jakarta.persistence.*;
import org.antlr.v4.runtime.misc.NotNull;

@Entity
public class Notification {
    //Todo: 알림을 통해서 comment로 이동했을 때, comment가 삭제되었다면 예외처리

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String message;

    @Enumerated(EnumType.STRING)
    NotificationStatus notificationStatus = NotificationStatus.UNREAD;

    @NotNull
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "comment_id")
    private Comment comment;
}
