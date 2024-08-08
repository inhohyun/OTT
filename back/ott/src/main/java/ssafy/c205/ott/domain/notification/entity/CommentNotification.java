package ssafy.c205.ott.domain.notification.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class CommentNotification extends Notification {

    @Column(nullable = false)
    private Long commentId;

    @Column(nullable = false)
    private Long commentAuthorId;

    @Column(nullable = false)
    private String commentAuthorName;
}
