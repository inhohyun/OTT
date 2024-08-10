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
    private Long lookbookId;
    private Long commentId;
    private Long commentAuthorId;
    private String commentAuthorName;
}
