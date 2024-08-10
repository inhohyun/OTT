package ssafy.c205.ott.domain.notification.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import ssafy.c205.ott.domain.account.entity.FollowStatus;

@Entity
@Getter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class FollowNotification extends Notification {
    private Long followerId;
    private Long followId;
    private String followerName;
    private FollowStatus followStatus;
}
