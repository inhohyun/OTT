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

    @Column(nullable = false)
    private Long followerId;

    @Column(nullable = false)
    private Long followId;

    @Column(nullable = false)
    private String followerName;

    @Column(nullable = false)
    private FollowStatus followStatus;
}
