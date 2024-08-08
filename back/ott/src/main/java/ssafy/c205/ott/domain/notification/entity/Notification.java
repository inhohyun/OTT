package ssafy.c205.ott.domain.notification.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import ssafy.c205.ott.common.entity.BaseEntity;

@Entity
@Getter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class Notification extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String message;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    NotificationStatus notificationStatus;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    NotificationType notificationType;

    @Column(nullable = false)
    private Long memberId;

}
